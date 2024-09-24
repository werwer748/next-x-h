"use client";

import {useQuery} from "@tanstack/react-query";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import {IPost} from "@/model/Post";

export default function PostRecommends() {
  //? 쿼리 키를 사용해 프로바이더에서 데이터를 제공 받는다.
  const { data } = useQuery<IPost[]>({ queryKey: ['posts', 'recommends'], queryFn: getPostRecommends });
  
  return data?.map((post) => <Post key={post.postId} post={post} />)
}