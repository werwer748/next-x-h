//* 대부분 프로바이더들은 클라이언트 컴포넌트
'use client';

import {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";

type TProps = {
  children: ReactNode,
}

export default function AuthSession({ children }: TProps) {
  return <SessionProvider>{children}</SessionProvider>;
}