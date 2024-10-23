"use client"; //? 버튼 함수사용을 위해 클라이언트 컴포넌트화

import style from "./logout-button.module.css";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Session} from "@auth/core/types";

type TProps = {
  me: Session
};

export default function LogoutButton({ me }: TProps) {
  const router = useRouter();
  /**
   * 로그인한 본인 정보를 담고있는 훅
   * => 클라이언트 컴포넌트에서만 쓸 수 있다.
   * 버튼에 최신 세션정보를 넘겨주기위해 프롭스로 전달받은 세션을 사용
   */
  // const {data: me} = useSession();

  const onLogout = () => {
    // 클라이언트 컴포넌트기 때문에 next-auth에서 제공하는 기능을 사용
    //* 버전 변경으로 코드 사용방법이 바뀜
    signOut({ redirectTo: '/'});
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