import axios from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const payload = await req.json();

  try {
    const event = payload?.data?.event;

    const title = event?.title || '알 수 없는 오류';
    const culprit = event?.culprit || '알 수 없는 위치';
    const permalink = event?.web_url || '#';
    const timestamp = event?.datetime
      ? new Date(event.datetime).toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        })
      : '알 수 없음';
    const level = event?.level || 'error';
    const message = event?.exception?.values?.[0]?.value || '메시지 없음';

    // Severity에 따라 이모지 선택
    const levelEmojiMap: Record<string, string> = {
      fatal: '💀',
      error: '🚨',
      warning: '⚠️',
      info: 'ℹ️',
    };
    const emoji = levelEmojiMap[level] || '🚨';

    // Discord로 보내기
    await axios.post(process.env.DISCORD_WEBHOOK_URL!, {
      content: `${emoji} [${level.toUpperCase()}] Sentry 알림

**📝 오류 제목:** ${title}
**📍 발생 위치:** ${culprit}
**🕒 발생 시간:** ${timestamp}
**📝 에러 메시지:** ${message}
🔗 [Sentry에서 이슈 확인하기](${permalink})`,
    });

    console.log('✅ Sent alert to Discord');
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('❌ Error sending to Discord:', error);
    return new Response('Error', { status: 500 });
  }
}
