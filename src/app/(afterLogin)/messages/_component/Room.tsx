"use client";

import style from '../message.module.css';
import {faker} from "@faker-js/faker";
import {useRouter} from "next/navigation";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function Room() {
  const router = useRouter();
  
  const user = {
    id: 'zugo',
    nickname: '쥬우고',
    Messages: [
      { roomId: 123, content: 'ㅎㅇ', createdAt: new Date() },
      { roomId: 123, content: 'ㅂㅇ', createdAt: new Date() }
    ],
  }
  
  const onClick = () => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`)
  };
  
  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        <img src={faker.image.avatarGitHub()} alt={""}/>
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp;
          ·
          &nbsp;
          <span className={style.postDate}>
            {dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}
          </span>
        </div>
        <div className={style.roomLastChat}>
          {user.Messages?.at(-1)?.content}
        </div>
      </div>
    </div>
  )
}