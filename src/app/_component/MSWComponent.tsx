//* 요청을 실제 서버로 할지 msw로 할지 판별하는 컴포넌트
"use client";

import {useEffect} from "react";

export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined") { // 브라우저에서만 돌아가는 것을 보장
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        require("@/mocks/browser");
      }
    }
  }, []);
  
  return null;
};