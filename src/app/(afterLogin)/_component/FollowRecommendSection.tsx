"use client";

import {useQuery} from "@tanstack/react-query";
import {IUser} from "@/model/User";
import {getFollowRecommends} from "@/app/(afterLogin)/_lib/getFollowRecommends";
import FollowRecommend from "@/app/(afterLogin)/_component/FollowRecommend";

export default function FollowRecommendSection() {
  const { data } = useQuery<IUser[]>({
    queryKey: ['users', 'followRecommends'],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  
  return data?.map((user) => <FollowRecommend key={user.id} user={user} />)
}