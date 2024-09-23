//* Next의 앱라우터에서 제공되는 기능으로 미들웨어를 통해 접근권한에 대한 컨트롤 관리를 편하게 해준다.
export { auth as middleware } from './auth';

export const config = {
  // 로그인을 해야만 접근할 수 있는 경로를 미들웨어에 등록
  matcher: ['/compose/tweet', '/home', '/explore', '/message', '/search'],
}