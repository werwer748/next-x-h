"use client";

import {useContext} from "react";
import {TabContext} from "@/app/(afterLogin)/home/_component/TabProvider";
import PostRecommends from "@/app/(afterLogin)/home/_component/PostRecommends";
import FollowingPosts from "@/app/(afterLogin)/home/_component/FollowingPosts";

export default function TabDecider() {
  //* context api를 통해 tab값을 가져온다.
  const { tab } = useContext(TabContext);
  
  //* 탭 값으로 컴포넌트 분기 처리
  if (tab === 'rec') {
    return <PostRecommends />
  }
  
  return <FollowingPosts />
}