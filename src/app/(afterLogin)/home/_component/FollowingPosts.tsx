"use client";
import {
  InfiniteData,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import {IPost} from "@/model/Post";
import {getFollowingPosts} from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import styles from "@/app/(afterLogin)/home/home.module.css";
import {useInView} from "react-intersection-observer";
import {Fragment, useEffect} from "react";

export default function FollowingPosts() {

  const {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching
  } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  });
  
  const {ref, inView } = useInView({
    threshold: 0, // 감지용 태그가 몇픽셀만큼 보이면 이벤트를 호출하는지
    delay: 0, // 보이고 몇초 후 이벤트를 호출할 것인지
  });
  
  //? 중복되는 로딩처리... 만들어둔 로딩 컴포넌트를 써도 되지만 더 좋은 처리방법이 있음 useSuspenseQuery!
  // if (isPending) {
  //   return (
  //     <div style={{display: 'flex', justifyContent: 'center'}}>
  //       <svg className={styles.loader} height="100%" viewBox="0 0 32 32" width={40}>
  //         <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4"
  //                 style={{stroke: 'rgb(29, 155, 240)', opacity: 0.2}}></circle>
  //         <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4"
  //                 style={{stroke: 'rgb(29, 155, 240)', strokeDasharray: 80, strokeDashoffset: 60}}></circle>
  //       </svg>
  //     </div>
  //   )
  // }
  
  useEffect(() => {
    // 화면에 이벤트용 태그가 보이면 inView가 true가 됨.
    if (inView) {
      //? 데이터를 불러오고있지 않고 다음 페이지가 있을 때 호출
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  
  if (isError) {
    return '에러났어열';
  }
  
  return (
    <>
      {data?.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.map((post) => <Post key={post.postId} post={post}/>)}
        </Fragment>
      ))}
      {/* 스크롤 이벤트 감지용 */}
      <div ref={ref} style={{height: 50}}/>
    </>
  )
}