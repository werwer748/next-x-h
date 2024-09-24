"use client";
import style from "./follow-recommend.module.css";
import {useQuery} from "@tanstack/react-query";
import {getFollowRecommends} from "@/app/(afterLogin)/_lib/getFollowRecommends";
import {IUser} from "@/model/User";

type TProps = {
  user: IUser;
}

export default function FollowRecommend({ user }: TProps) {
  const onFollow = () => {
  
  };
  
  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  )
}