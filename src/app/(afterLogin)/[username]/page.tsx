import style from './profile.module.css';
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getUserPosts} from "@/app/(afterLogin)/[username]/_lib/getUserPosts";
import UserPosts from "@/app/(afterLogin)/[username]/_component/UserPosts";
import UserInfo from "@/app/(afterLogin)/[username]/_component/UserInfo";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";

type TProps = {
  params: { username: string };
};
//* SSR 적용 - 검색엔진에 노출
export default async function Profile({params}: TProps) {
  // [username] 슬러그에들어간 값을 가져올 수 있다.
  const {username} = params;
  
  //? SSR을 위해 prefetch!
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', username],
    queryFn: getUser
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts
  });
  const dehydratedState = dehydrate(queryClient);
  
  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  )
}