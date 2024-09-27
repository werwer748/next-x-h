"use client";

import style from "../photo-modal.module.css"
import {useQuery} from "@tanstack/react-query";
import {IPost} from "@/model/Post";
import {getSinglePost} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";

type TProps = {
  id: string;
}

export default function ImageZone({ id }: TProps) {
  const {data: post, error} = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  });
  
  if (!post?.Images[0]) {
    return null;
  }
  
  return (
    <div className={style.imageZone}>
    <img src={post?.Images[0].link} alt={post?.Images[0].Post?.content}/>
    <div className={style.image} style={{backgroundImage: `url(${post?.Images[0].link})`}}/>
    <div className={style.buttonZone}>
      <div className={style.buttonInner}>
        <ActionButtons white/>
      </div>
    </div>
  </div>
  );
}