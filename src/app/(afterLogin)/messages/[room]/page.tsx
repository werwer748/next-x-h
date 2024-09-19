import style from './chat-room.module.css';
import {faker} from "@faker-js/faker";

import cx from 'classnames'
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import dayjs from "dayjs";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Link from "next/link";

dayjs.locale('ko');
dayjs.extend(relativeTime)

export default function ChatRoom() {
  const user = {
    id: 'zugo',
    nickname: '쥬우고',
    image: faker.image.avatarGitHub()
  }
  
  const messages = [
    {messageId: 1, roomId: 123, id: 'hugoKang01',  content: '안녕하세요. 내가 진짜', createdAt: new Date()},
    {messageId: 2, roomId: 123, id: 'zugo', content: '안녕히가세요. 나는 가짜', createdAt: new Date()},
  ]
  
  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton/>
        <div><h2>{user.nickname}</h2></div>
      </div>
      <Link href={user.nickname} className={style.userInfo}>
        <img src={user.image} alt={user.id}/>
        <div><b>{user.nickname}</b></div>
        <div>@{user.id}</div>
      </Link>
      <div className={style.list}>
        {messages.map((m) => {
          if (m.id === 'hugoKang01') { // 내가 보낸 메시지!
            return (
              <div
                key={m.messageId}
                className={cx(style.message, style.myMessage)}>
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
              </div>
            );
          }
          return (
            <div
              key={m.messageId}
              className={cx(style.message, style.yourMessage)}>
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
            </div>
          );
        })}
      </div>
    </main>
  )
}