"use client";

import {ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type TProps = {
  children: ReactNode;
}

function RQProvider({ children }: TProps) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { //? react-query 전역 설정이라고 함
        queries: {
          /**
           * 프로바이더 코드에서 전역설정을 하지만 원하면
           * useQuery를 사용하는 시점에 다른 설정을 적용할 수 도 있다.
           *
           * refetchOnWindowFocus: 브라우저에서 다른탭을 보고있다가 프로젝트가 있는 텝으로 돌아왔을 때
           * refetchOnMount: 컴포넌트가 다시 마운트 될 때
           * refetchOnReconnect: 인터넷 연결이 끊겼다가 다시 연결 되었을 때
           *
           * retry: 통신에 실패했을 때 몇번정도 재시도할지 설정
           */
          
          //* stale상태의 데이터는 이 세가지 경우 설정에 따라 데이터를 다시 가져옴
          refetchOnWindowFocus: false,
          refetchOnMount: true,
          refetchOnReconnect: true,
          
          retry: false,
        },
      },
    })
  );
  
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'} />
    </QueryClientProvider>
  );
}

export default RQProvider;