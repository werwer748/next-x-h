"use client";
import {InfiniteData, useInfiniteQuery} from "@tanstack/react-query";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import {IPost} from "@/model/Post";
import {Fragment} from "react";

export default function PostRecommends() {
  //? 쿼리 키를 사용해 프로바이더에서 데이터를 제공 받는다.
  /**
   * 인피니트 스크롤링을 위해 useInfiniteQuery 사용 - 타입 추가
   * useInfiniteQuery는 데이터를 2차원 배열로 관리함
   * ex) [[1,2,3,4,5], [6,7,8,9,10] ...] => 페이지별로 따로따로 관리하는 것.
   *
   * 가져온 data를 사용하기위해서는 data의 pages를 사용해야 한다.
   *
   * 타입 확인
   * <IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>
   * 키 타입 (_1: string...) 자리 뒤에 pageParam의 타입을 정의함
   * => postId의 타입을 명시
   */
  const { data } = useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    //* 기본 페이지 넘버 필요
    initialPageParam: 0,
    /**
     * getNextPageParam?
     * 다음에 어떤 기준으로 데이터를 호출할지 설정
     * lastPage를 통해 마지막에 호출한 게시글들의 정보를 활용 가능
     */
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
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
  
  return data?.pages.map((page, idx) => (
    <Fragment key={idx}>
      {page.map((post) => <Post key={post.postId} post={post}/>)}
    </Fragment>
  ))
}