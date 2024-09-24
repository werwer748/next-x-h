"use client";

import {useQuery} from "@tanstack/react-query";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import {IPost} from "@/model/Post";

export default function PostRecommends() {
  //? 쿼리 키를 사용해 프로바이더에서 데이터를 제공 받는다.
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    /**
     * staleTime:
     * 언제까지 Fresh 상태를 유지할 것인지 결정하는 옵션
     * 기본값은 0 => 데이터 가져오면 바로 stale
     * 단위는 ms
     * Infinuty를 사용하면 무조건 Fresh로 유지
     *
     * 일반 적으로 gcTime보다 짧게 설정하여 사용
     */
    staleTime: 60 * 1000,
    /**
     * gcTime:
     * inactive 상태인 데이터를 지정한 시간이 지나면 메모리에서 삭제한다.
     * 가비지 컬렉터 타임?? 기본은 5분
     * 브라우져 메모리에 너무 많은 데이터가 쌓이면 웹사이트가 터진다.
     * 안쓰는 데이터를 정리해주는 옵션
     * inactive 상태일 때 gcTime이 적용되기 시작한다.
     *
     * 일반적으로 staleTime보다 길게 설정하여 사용
     */
    gcTime: 300 * 1000
  });
  
  return data?.map((post) => <Post key={post.postId} post={post} />)
}