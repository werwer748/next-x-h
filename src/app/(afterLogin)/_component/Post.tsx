import style from './post.module.css';
import Link from "next/link";
//? dayjs는 플러그인방식으로 사용하기 때문에 필요한기능을 가져와서 따로 연결해야 한다.
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";

//* 플러그인 연결!
dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function Post() {
  const target = {
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
    //* 시멘틱 태그를잘 활용하면 도움이 된다
    <article className={style.post}>
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
    </article>
  )
}