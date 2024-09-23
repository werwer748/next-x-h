import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const {
  handlers: { GET, POST }, // API ROUTE
  auth, // 로그인 여부
  signIn // 로그인하기
} = NextAuth({
  // 로그인에 사용되는 페이지를 등록
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password
          })
        })
        if (!response.ok) return null
        
        const user = await response.json();
        
        return user;
      },
    }),
  ],
});