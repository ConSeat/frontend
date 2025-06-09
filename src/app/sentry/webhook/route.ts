import axios from 'axios';
import { NextRequest } from 'next/server';

// TODO: 배포 후 console 제거
export async function POST(req: NextRequest) {
  const payload = await req.json();

  console.log('✅ Received Sentry Webhook:', JSON.stringify(payload, null, 2));

  try {
    // Discord로 보내기
    await axios.post(process.env.DISCORD_WEBHOOK_URL!, {
      content: `🚨 Sentry Alert: ${payload?.data?.issue?.title || 'Unknown Issue'}`,
    });

    console.log('✅ Sent alert to Discord');
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('❌ Error sending to Discord:', error);
    return new Response('Error', { status: 500 });
  }
}
