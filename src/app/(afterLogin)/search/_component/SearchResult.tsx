"use client";

import {useQuery} from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import {IPost} from "@/model/Post";
import {getSearchResult} from "@/app/(afterLogin)/search/_lib/getSearchResult";

type TProps = {
  searchParams: { q: string, f?: string, pf?: string };
}

export default function SearchResult({ searchParams }: TProps) {
  //* 다이나믹 쿼리키 타이핑 방법 <>의 4번째 자리가 키에대한 타입이다.
  const { data } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, TProps['searchParams']]>({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 30 * 1000,
    gcTime: 180 * 1000
  });
  
  return data?.map((post) => (
    <Post key={post.postId} post={post} />
  ));
}