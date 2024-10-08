"use client";
import {useQuery, useSuspenseQuery} from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import {IPost} from "@/model/Post";
import {getFollowingPosts} from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import styles from "@/app/(afterLogin)/home/home.module.css";

//* 예제를 남겨두기 위해 해당 컴포넌트는 인피니트쿼리 적용하지 않음
export default function FollowingPosts() {
  /**
   * 중복되는 로딩처리
   * 상위 Suspense의 fallback을 인식해서 사용하게 된다.
   */
  const { data, isPending } = useSuspenseQuery<IPost[]>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
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
  
  return data?.map((post) => <Post key={post.postId} post={post} />)
}