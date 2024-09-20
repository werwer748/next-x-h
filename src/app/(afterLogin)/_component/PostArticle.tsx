"use client";

import {ReactNode} from "react";
import style from './post.module.css';
import {useRouter} from "next/navigation";

type TProps = {
  children: ReactNode;
  post: {
    postId: number;
    content: string;
    createdAt: Date;
    Images: any[];
    User: {
      id: string;
      nickname: string;
      image: string;
    },
  }
}
export default function PostArticle({children, post}: TProps) {
  const router = useRouter();
  
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`)
  };
  
  return (
    // onClickCapture를 통해 이벤트 캡처링을 할 수 있다.
    <article className={style.post} onClickCapture={onClick}>
      {children}
    </article>
  );
}