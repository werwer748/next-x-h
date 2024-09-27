"use client";

import style from "@/app/(afterLogin)/[username]/profile.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {useQuery} from "@tanstack/react-query";
import {IUser} from "@/model/User";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";

type TProps = {
  username: string;
}

export default function UserInfo({ username }: TProps) {
  //* <>의 1, 3번째는 같으면됨. 2번쨰는 에러처리
  //? useQuery에서 구조분해할당으로 꺼낼수 있는 다양한 값이 있다.
  const { data: user, error, isLoading } = useQuery<IUser, Object, IUser, [_1: string, _2: string]>({
    queryKey: ["users", username],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  });
  
  if (error) {
    console.log('error');
    console.dir(error);
    return (
      <>
        <div className={style.header}>
          <BackButton/>
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}>
            {/*<img src={undefined} alt={username}/>*/}
          </div>
          <div className={style.userName}>
            <div>{username}</div>
          </div>
          <div style={{
            height: 100,
            fontSize: 31,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            계정이 존재하지 않음
          </div>
        </div>
      </>
    )
  }
  
  if (!user) return null;
  
  return (
    <>
      <div className={style.header}>
        <BackButton/>
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id}/>
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
      </div>
    </>
  )
}