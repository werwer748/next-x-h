import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./single-post.module.css";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getSinglePost} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import {getComments} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";

type TProps = {
  params: { id: string };
}
export default async function SinglePostPage({params}: TProps) {
  const {id} = params;
  
  //* SSR 적용!
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', id],
    queryFn: getSinglePost
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', id, 'comments'],
    queryFn: getComments
  });
  const dehydratedState = dehydrate(queryClient);
  
  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton/>
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <div className={style.content}>
          <SinglePost id={id}/>
          <CommentForm id={id}/>
          <div className={style.commentBox}>
            <Comments id={id}/>
          </div>
        </div>
      </HydrationBoundary>
    </div>
  )
}
