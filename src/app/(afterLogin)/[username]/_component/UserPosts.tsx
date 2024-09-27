"use client";

import {useQuery, useQueryClient} from "@tanstack/react-query";
import {IPost} from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import {getUserPosts} from "@/app/(afterLogin)/[username]/_lib/getUserPosts";

type TProps = {
  username: string;
}

export default function UserPosts({ username }: TProps) {
  //* <>의 1, 3번째는 같으면됨. 2번쨰는 에러처리
  const { data } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })
  
  const queryClient = useQueryClient();
  
  //* 키로 유저 데이터 가져오기
  const user = queryClient.getQueryData(['users', username]);
  console.log("user:::", user);
  
  if (user) {
    return data?.map((post) => (
      <Post post={post} key={post.postId}/>
    ))
  }
}