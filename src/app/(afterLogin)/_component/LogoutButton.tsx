"use client"; //? 버튼 함수사용을 위해 클라이언트 컴포넌트화

import style from "./logout-button.module.css";

export default function LogoutButton() {
  const me = {
    id: 'hugoKang01',
    nickname: '휴고',
    image: '/5Udwvqim.jpg'
  }

  const onLogout = () => {
    console.log("Logout");
  };

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.image} alt={me.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  )
}