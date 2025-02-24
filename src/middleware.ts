import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import allowrdHallNames from '@/utils/consts/allowrdHallNames';

const HALL_NAME_INDEX = 2;

export const middleware = (req: NextRequest) => {
  const hall = req.nextUrl.pathname.split('/')[HALL_NAME_INDEX]; // '/home/[hall]/single' 에서 hall 이름 추출

  if (hall !== undefined && !Object.values(allowrdHallNames).includes(hall)) {
    return NextResponse.redirect(new URL('/not-found', req.url)); // 현재 경로가 /home이 아니면서 유효하지 않으면 404 페이지로 리디렉트
  }

  return NextResponse.next();
};

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/home/:hall*'],
};
