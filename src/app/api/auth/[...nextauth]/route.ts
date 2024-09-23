/**
 * catch-all 라우트
 * [...slug] => 어떤 단어라도 들어갈 수 있는 주소가 된다.
 * http://프론트서버/api/auth/~~아무거나~~/route.ts 이런식으로 되는 것
 * /api/auth/~~ 으로 가는 요청은 모두 next-auth가 관리를 한다.
 *
 * 실제 api를 만드는것과 유사해서 프론트서버를 백엔드 서버처림 이용해도 되지만 규모가 커지면 어차피 분리해야 됨
 * => 자원 관리를 위해서
 *
 * auth.ts에서 만든 handlers의 GET과 POST를 가져다 쓴다.
 */
export { GET, POST} from "@/auth";

