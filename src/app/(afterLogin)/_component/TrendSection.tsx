"use client";
import style from "./trend-section.module.css";
import Trend from "@/app/(afterLogin)/_component/Trend";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {getTrends} from "@/app/(afterLogin)/_lib/getTrends";
import {IHashtag} from "@/model/Hashtag";

export default function TrendSection() {
  const pathname = usePathname();
  const {data: session} = useSession();
  
  const { data } = useQuery<IHashtag[]>({
    //! 키가 같으면 같은 데이터를 가지고 있다. - 탐색하기의 트렌드와 같음
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    
    //? 로그인한 사용자가 있을 때만 호출하게끔 설정
    enabled: !!session?.user
  });
  
  //? explore경로 일시 오른쪽 탭에서 제거
  if (pathname === '/explore') return null;
  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend) => (
            <Trend key={trend.tagId} trend={trend} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>
        트렌드를 가져올 수 없습니다.
      </div>
    </div>
  )
}