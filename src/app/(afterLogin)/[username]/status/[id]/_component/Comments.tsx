"use client";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {IPost} from "@/model/Post";
import {getComments} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import Post from "@/app/(afterLogin)/_component/Post";

type TProps = {
  id: string;
}

export default function Comments({ id }: TProps) {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(['posts', id]);
  
  const {data, error} = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
    queryKey: ["posts", id, 'comments'],
    queryFn: getComments,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    //? 게시글 없는경우 아에 요청을 하지 않음
    enabled: !!post
  });
  
  
  if (!post) return null;
  
  return data?.map((post) => <Post key={post.postId} post={post} />)
}