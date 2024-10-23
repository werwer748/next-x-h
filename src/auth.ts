import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {NextResponse} from "next/server";
import {cookies} from "next/headers";
//! 쿠키 export default 안되있어서 이렇게 꺼내써야함!
import { parse } from 'cookie';

export const {
  handlers: {GET, POST}, // API ROUTE
  auth, // 로그인 여부
  signIn // 로그인하기
} = NextAuth({
  // 로그인에 사용되는 페이지를 등록
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  // auth의 메소드들에 콜백으로 실행될 함수 등록
  // callbacks: {
  //  //* 이런식으로 다양하게 활용이 가능
  //   async authorized({ request, auth }) {}
  // },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password
          })
        });
        console.log('authResponse', authResponse);
        //* 백엔드가 응답에 토큰을 쿠키에 넣어서 보내주고 있는데 그걸 꺼내오는 것.
        const setCookie = authResponse.headers.get("Set-Cookie");
        console.log('set-cookie', setCookie);
        
        //* 받아온 쿠키는 문자열이기 때문에 해당 쿠키를 객체로 만들어야 한다. (cookie 라이브러리 사용)
        if (setCookie) {
          const parsed = parse(setCookie);
          /**
           * ? next에 쿠키를 설정해준다.
           *
           * 브라우저에 쿠키를 심어주는 것.
           * 프론트 서버에는 쿠키를 심으면 안됨.
           * - 프론트 서버는 공용이기 때문에 여러 브라우저가 같은 서버를 보고있어서 개인정보가 유출될 수 있기 떄문이다.
           */
          cookies().set('connect.sid', parsed['connect.sid'] as string, parsed);
        }
        
        if (!authResponse.ok) return null
        
        const user = await authResponse.json();
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
        };
      },
    }),
  ],
});