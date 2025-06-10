import axios from 'axios';
import { NextRequest } from 'next/server';

// TODO: 배포 후 console 제거
export async function POST(req: NextRequest) {
  const payload = await req.json();

  console.log('✅ Received Sentry Webhook:', JSON.stringify(payload, null, 2));

  try {
    const issue = payload?.data?.issue;

    const title = issue?.title || '알 수 없는 오류';
    const project = issue?.project || '알 수 없는 프로젝트';
    const culprit = issue?.culprit || '알 수 없는 위치';
    const permalink = issue?.permalink || '#';
    const firstSeen = issue?.firstSeen
      ? new Date(issue.firstSeen).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      : '알 수 없음';
    const lastSeen = issue?.lastSeen
      ? new Date(issue.lastSeen).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      : '알 수 없음';
    const count = issue?.count ? `${issue.count}회 발생` : '횟수 알 수 없음';
    const level = issue?.level || 'error';

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
      content: `${emoji} **Sentry 오류 알림**

**📝 오류 제목:** ${title}
**📌 프로젝트:** ${project}
**📍 발생 위치:** ${culprit}
**🕒 최초 발생:** ${firstSeen}
**🕒 최근 발생:** ${lastSeen}
**🔢 발생 횟수:** ${count}
🔗 [Sentry에서 이슈 확인하기](${permalink})`,
    });

    console.log('✅ Sent alert to Discord');
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('❌ Error sending to Discord:', error);
    return new Response('Error', { status: 500 });
  }
}
