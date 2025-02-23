import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedHallNames = ['olim'];
const HALL_NAME_INDEX = 2;

export const middleware = (req: NextRequest) => {
  const hall = req.nextUrl.pathname.split('/')[HALL_NAME_INDEX]; // '/home/[hall]/single' 에서 hall 이름 추출

  if (hall !== undefined && !allowedHallNames.includes(hall)) {
    return NextResponse.redirect(new URL('/not-found', req.url)); // 현재 경로가 /home이 아니면서 유효하지 않으면 404 페이지로 리디렉트
  }

  return NextResponse.next(); // 허용된 값이면 정상 진행
};

// 미들웨어가 적용될 경로 설정 /home 이라 경로에서만 실행
export const config = {
  matcher: ['/home/:hall*'],
};
