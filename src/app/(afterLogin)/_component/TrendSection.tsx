"use client";

import style from "./trend-section.module.css";
import Trend from "@/app/(afterLogin)/_component/Trend";
import {usePathname} from "next/navigation";

export default function TrendSection() {
  const pathname = usePathname();
  
  //? explore경로 일시 오른쪽 탭에서 제거
  if (pathname === '/explore') return null;
  
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  )
}