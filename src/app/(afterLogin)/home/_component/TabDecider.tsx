"use client";

import {useContext, use} from "react";
import {TabContext} from "@/app/(afterLogin)/home/_component/TabProvider";
import PostRecommends from "@/app/(afterLogin)/home/_component/PostRecommends";
import FollowingPosts from "@/app/(afterLogin)/home/_component/FollowingPosts";

export default function TabDecider() {
  //* context api를 통해 tab값을 가져온다.
  // const { tab } = useContext(TabContext);
  const { tab } = use(TabContext); // 이렇게 use를 사용할 수 있고 이 경우 if문 안에서 사용이 가능
  
  //* 탭 값으로 컴포넌트 분기 처리
  if (tab === 'rec') {
    return <PostRecommends />
  }
  
  return <FollowingPosts />
}