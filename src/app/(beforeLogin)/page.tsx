import HomeComponent from "@/app/(beforeLogin)/_component/HomeComponent";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

export default async function Home() {
  /**
   * 서버컴포넌트기 때문에 auth를 사용해야 함
   * => useSession의 서버컴포넌트 버전 정도로 생각하면 됨
   */
  const session = await auth();
  
  if (session?.user) {
    redirect('/home');
    return null;
  }
  
  return <HomeComponent />;
}
