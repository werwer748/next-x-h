import style from "@/app/(beforeLogin)/_component/home-component.module.css";
import Image from "next/image";
import Link from "next/link";

import zLogo from "../../../../public/zlogo.png";

export default function HomeComponent() {
  return (
    <div className={style.container}>
      <div className={style.left}>
        {/*
        ? img 태그 대신 Image를 사용한다!
        ? -> next가 알아서 이미지를 최적화 시켜줌.
        */}
        <Image src={zLogo} alt={"logo"} priority={true}/>
      </div>
      <div className={style.right}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className={style.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href={"/login"} className={style.login}>
          로그인
        </Link>
      </div>
    </div>
  );
}