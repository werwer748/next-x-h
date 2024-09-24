"use client"; //? 버튼 함수사용을 위해 클라이언트 컴포넌트화

import style from "./logout-button.module.css";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  /**
   * 로그인한 본인 정보를 담고있는 훅
   * => 클라이언트 컴포넌트에서만 쓸 수 있다.
   */
  const {data: me} = useSession();

  const onLogout = () => {
    // 클라이언트 컴포넌트기 때문에 next-auth에서 제공하는 기능을 사용
    signOut({redirect: false}).then(() => {
      router.replace("/");
    });
  };
  
  if (!me?.user) return null;
  
  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  )
}