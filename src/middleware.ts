//* Next의 앱라우터에서 제공되는 기능으로 미들웨어를 통해 접근권한에 대한 컨트롤 관리를 편하게 해준다.
import {NextResponse} from "next/server";
import { auth } from './auth';

//? 자연스럽게 미들웨어를 통해 세션을 체크해서 로그인한 사용자와 로그인하지 않은 사용자의 로직을 갈라준다.
export async function middleware() {
  const session = await auth();
  
  if (!session) {
    // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOME_URL}/login`)
    return NextResponse.redirect(`http://localhost:3000/i/flow/login`)
  }
}

export const config = {
  // 로그인을 해야만 접근할 수 있는 경로를 미들웨어에 등록
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
}