"use client";

import style from "../search.module.css";
import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

export default function Tab() {
  const [current, setCurrent] = useState('hot');
  const router = useRouter();
  //* 클라이언트 컴포넌트기떄문에 간단하게 훅으로 처리
  const searchParams = useSearchParams();
  
  const onClickHot = () => {
    setCurrent('hot');
    //? get("q")를 통해 q?= ... 인 쿼리 스트링을 가져옴
    router.replace(`search?q=${searchParams.get("q")}`);
  };
  
  const onClickNew = () => {
    setCurrent('new');
    //? toString(): 현재 서치파람을 전부다 글자로 가져옴 => 현재경로 + &f=live
    router.replace(`search?${searchParams.toString()}&f=live`);
  };
  
  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div onClick={onClickHot}>
          인기
          <div className={style.tabIndicator} hidden={current === 'new'}></div>
        </div>
        <div onClick={onClickNew}>
          최신
          <div className={style.tabIndicator} hidden={current === 'hot'}></div>
        </div>
      </div>
    </div>
  );
}