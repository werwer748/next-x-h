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
          refetchOnWindowFocus: false,
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