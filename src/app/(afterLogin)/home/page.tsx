import style from "./home.module.css";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import PostRecommends from "@/app/(afterLogin)/home/_component/PostRecommends";

export default async function Home() {
  //* react-query는 서버컴포넌트에서도 어느정도 사용이 가능하다.
  const queryClient = new QueryClient();
  
  //* 서버에서 가져온 데이터를 클라이언트의 리액트쿼리가 넘겨받는다.(하이드레이트한다.)
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends
  });
  
  //* 데이터를 불러온 후 dehydrate
  const dehydratedState = dehydrate(queryClient);
  
  /**
   *  dehydratedState를 리액트 쿼리가 하이드레이트 해야 함.
   *
   *  하이드레이트?
   *  => 서버에서 온 데이터를 클라이언트에서 그대로 형식에 맞춰서 물려받는 것.
   *
   *  쿼리 클라이언트 작성시 무조건 객체형식으로 작성해야 한다.
   *  {
   *     queryKey: ['posts', 'recommends'],
   *     queryFn: getPostRecommends
   *  }
   *  => ['posts', 'recommends'] 이런 키를 가지고 있을 떄는
   *  항상 getPostRecommends를 실행해라
   *
   *  값을 꺼내올때 키를 통해 가져온다.
   *  => queryClient.getQueryData(['posts', 'recommends'])
   *  가져온 데이터를 수정시
   *  => setQueryData(['posts', 'recommends'], ...) 을 사용
   */
  
  // queryClient.getQueryData(['posts', 'recommends'])
  
  return (
    <main className={style.main}>
      {/* HydrationBoundary 를 통해 디하이드레이트된 데이터를 물려받아서 클라이언트 리액트 쿼리로 만든다. */}
      <HydrationBoundary state={dehydratedState}>
        {/* Provider 태그 내부에서만 Context API를 쓸 수 있음*/}
        <TabProvider>
          <Tab/>
          <PostForm />
          {/* 클라이언트의 리액트쿼리가 받기위해서 컴포넌트 분리 */}
          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </main>
  )
}