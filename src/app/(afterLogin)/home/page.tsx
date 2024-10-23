import style from "./home.module.css";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";
import {Suspense} from "react";
import Loading from "@/app/(afterLogin)/home/loading";
import {auth} from "@/auth";

/**
 * 서버사이드 렌더링이 적용되서
 * 서버에서 보여줄 부분을 만들어서 내려주기 떄문에 로딩을 볼 수 없다.
 * => Suspense를 직접 사용하고 하이드레이션 컴포넌트를 나눠서 해결
 */
export default async function Home() {
  const session = await auth();
  
  return (
    <main className={style.main}>
        {/* Provider 태그 내부에서만 Context API를 쓸 수 있음*/}
        <TabProvider>
          <Tab/>
          <PostForm me={session} />
          {/* 스트리밍 방식으로 페이지 데이터를 받아올 때 로딩이 필요한 부분은 따로 서스팬스를 직접 걸어 사용하는 것도 좋은 방법이다.*/}
          {/* 서스펜스가 위에 있어야 아래 로딩되고 있는 자식들을 감지할 수 있다. */}
          {/* 로딩이 실제로 필요한 게시글 목록만 서스펜스 처리한것 */}
          <Suspense fallback={<Loading />}>
            <TabDeciderSuspense />
          </Suspense>
        </TabProvider>
    </main>
  )
}