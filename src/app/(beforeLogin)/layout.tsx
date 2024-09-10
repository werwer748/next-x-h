import {ReactNode} from "react";
import style from "@/app/(beforeLogin)/_component/home-component.module.css";

type TProps = {
  children: ReactNode;
  modal: ReactNode;
}

export default function BeforeLoginLayout({
  children,
  modal // 페러렐 라우트를 위한 모달 -> 같은 폴더에 @modal폴더가 없으면 에러
}: TProps) {
  return (
    <div className={style.container}>
      {/*
        children과 modal이 함께 있기 때문에
        현재 page.tsx와 모달의 page.tsx가 함께 뜰 수 있는 것
      */}
      {children}
      {modal}
    </div>
  )
}
/**
 * 루트 URL일 때는 children -> page.tsx, modal -> @modal/default.tsx
 * URL/i/flow/login 일 때는 children -> i/flow/login/page.tsx, modal -> @modal/i/flow/login/page.tsx
 * 인터셉팅 라우트를 사용하여 수정 후
 * children -> page.tsx, modal -> @modal/(.)i/flow/login/page.tsx
 */