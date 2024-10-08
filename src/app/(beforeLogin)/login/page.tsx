"use client";

// import {redirect} from "next/navigation"; // next에서 제공하는 redirect - 서버
import { useRouter } from "next/navigation";
import HomeComponent from "@/app/(beforeLogin)/_component/HomeComponent";
import {useSession} from "next-auth/react";

export default function Login() {
  //* 페이지 접근시 해당 경로로 리다이렉트 시킨다.
  // 서버쪽 리다이렉트라서 인터셉트가 작동하지 않는다.
  // redirect("/i/flow/login"); -> 클라이언트 컴포넌트에서는 동작하지 않는다.

  //* 클라이언트에서 링크를 통해서 이동할 수 있게 변경
  const router = useRouter();
  //* 클라이언트 컴포넌트에서 로그인 여부 체크!
  const { data: session } = useSession();
  
  if (session?.user) {
    router.replace("/home");
    return null;
  }
  
  router.replace('/i/flow/login')
  return <HomeComponent />;
}
/*
* push와 replace
* 페이지를 이동하는 동작은 똑같다.
* 뒤로가기 했을 때의 동작이 다름
*
* router.push
* localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
* 뒤로가기
* localhost:3000 <- localhost:3000/login <- localhost:3000/i/flow/login
* 현재 /login으로 접근하면 경로를 강제로 바꾸는데 이렇게되면 뒤로가기로 페이지를 빠져나올 수 없음
*
* router.replace
* localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
* 뒤로가기
* localhost:3000 <- localhost:3000/i/flow/login
* replace를 사용한 컴포넌트는 history에서 사라짐
*/