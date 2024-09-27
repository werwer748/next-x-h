"use client";

import {useQuery} from "@tanstack/react-query";
import {IPost} from "@/model/Post";
import {getSinglePost} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import Post from "@/app/(afterLogin)/_component/Post";

type TProps = {
  id: string;
  noImage?: boolean;
}
export default function SinglePost({id, noImage}: TProps) {
  const {data: post, error} = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  });
  
  if (error) {
    return <div style={{
      height: 100,
      fontSize: 31,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>게시글을 찾을 수 없습니다.</div>
  }
  
  if (!post) return null;
  
  return <Post post={post} noImage={noImage} />
}