import style from './post.module.css';
import Link from "next/link";
//? dayjs는 플러그인방식으로 사용하기 때문에 필요한기능을 가져와서 따로 연결해야 한다.
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "@/app/(afterLogin)/_component/PostArticle";

//* 플러그인 연결!
dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function Post() {
  const target = {
    postId: 1,
    User: {
      id: 'elonmusk',
      nickname: 'Elon Musk',
      image: '/yRsRRjGO.jpg',
    },
    content: '클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ',
    createdAt: new Date(),
    Images: [],
  }
  
  return (
    /**
      * 해당 범위가 클릭되면 status페이지로 이동해야함
      * 해당 기능 구현을 위해서 이 컴포넌트 자체를 클라이언트 컴포넌트로 바꿔야할까?
      * => 내부에 새로운 컴포넌트를 하나 만들면 간단하게 처리 가능!
    */
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname}/>
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp;
              ·
              &nbsp;
            </Link>
            <span className={style.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
          </div>
          <div>{target.content}</div>
          <div className={style.postImageSection}>
          
          </div>
          <ActionButtons/>
        </div>
      </div>
    </PostArticle>
  )
}