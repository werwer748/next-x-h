import style from "./home.module.css";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";

export default function Home() {
  return (
    <main className={style.main}>
      {/* Provider 태그 내부에서만 Context API를 쓸 수 있음*/}
      <TabProvider>
        <Tab/>
        <PostForm />
        <Post />
        <Post />
      </TabProvider>
    </main>
  )
}