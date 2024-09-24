import style from "./home.module.css";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

//* 데이터 불러오기
async function getPostRecommends() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/postRecommends`, {
    //? 데이터 캐싱과 관련된 설정
    next: {
      //? 해당 태그를 통해 캐시를 초기화할 수 있다. - revalidateTag를 사용
      //? revalidatePath라는걸 사용하면 이 페이지에 관련된 데이터를 새로고침할 수 도 있다.
      tags: ['posts', 'recommends'],
    },
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  
  return res.json()
}

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
      {/* Provider 태그 내부에서만 Context API를 쓸 수 있음*/}
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab/>
          <PostForm />
          <Post />
          <Post />
        </TabProvider>
      </HydrationBoundary>
    </main>
  )
}