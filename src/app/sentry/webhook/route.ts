import axios from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const payload = await req.json();

  try {
    const event = payload?.data?.event;

    const level = event?.level || 'error';
    const levelEmojiMap: Record<string, string> = {
      fatal: '💀',
      error: '🚨',
      warning: '⚠️',
      info: 'ℹ️',
    };
    const emoji = levelEmojiMap[level] || '🚨';

    const title = event?.title || '알 수 없는 오류';
    const culprit = event?.culprit || '알 수 없는 위치';

    const tags = event?.tags || [];
    const getTag = (key: string) =>
      tags.find(([tagKey]: [string, string]) => tagKey === key)?.[1] || '-';

    const apiEndpoint = getTag('api_endpoint');
    const apiMethod = getTag('api_method');
    const apiStatus = getTag('api_status');

    const isApiError = apiEndpoint !== '-';

    const apiInfo = isApiError ? `${apiMethod} ${apiStatus} ${apiEndpoint}` : 'API 오류 아님';

    const timestamp = event?.datetime
      ? new Date(event.datetime).toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        })
      : '알 수 없음';
    const message = event?.exception?.values?.[0]?.value || '메시지 없음';
    const permalink =
      event?.web_url || 'https://conseat.sentry.io/issues/?project=4509372106539008';

    const osContext = event?.contexts?.os;
    const osName = osContext?.name || 'Unknown OS';
    const osVersion = osContext?.version || 'Unknown Version';

    const browserContext = event?.contexts?.browser;
    const browserName = browserContext?.name || 'Unknown Browser';
    const browserVersion = browserContext?.version || 'Unknown Version';

    // Discord로 보내기
    await axios.post(process.env.DISCORD_WEBHOOK_URL!, {
      content: `${emoji} ${level.toUpperCase()} Sentry Error  
[${title}](${permalink})  
${message}  
**발생 시간**  
${timestamp}  
**URL**  
${culprit}  
**API URL**  
${apiInfo}  
**환경**  
${osName} ${osVersion} ${browserName} ${browserVersion}`,
    });

    console.log('✅ Sent alert to Discord');
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('❌ Error sending to Discord:', error);
    return new Response('Error', { status: 500 });
  }
}
