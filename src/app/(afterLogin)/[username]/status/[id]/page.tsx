import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./single-post.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";

export default function SinglePost() {
  return (
    <div className={style.main}>
      <div className={style.header}>
        <BackButton/>
        <h3 className={style.headerTitle}>게시하기</h3>
      </div>
      {/* 답글입력 ~ 답글목록*/}
      <div className={style.commentBox}>
        {/*<Post/>*/}
        
        <CommentForm/>
        {/*<Post/>*/}
        {/*<Post/>*/}
        {/*<Post/>*/}
        {/*<Post/>*/}
        {/*<Post/>*/}
        {/*<Post/>*/}
      </div>
    </div>
  )
}
