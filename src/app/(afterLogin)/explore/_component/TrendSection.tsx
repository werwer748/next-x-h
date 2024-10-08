"use client";

import {useQuery} from "@tanstack/react-query";
import {IHashtag} from "@/model/Hashtag";
import {getTrends} from "@/app/(afterLogin)/_lib/getTrends";
import style from "@/app/(afterLogin)/_component/trend-section.module.css";
import Trend from "@/app/(afterLogin)/_component/Trend";

export default function TrendSection() {
  const {data} = useQuery<IHashtag[]>({
    //! 키가 같으면 같은 데이터를 가지고 있다. - 레이아웃의 트렌드와 같음
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        {data?.map((trend) => (
          <Trend key={trend.tagId} trend={trend}/>
        ))}
      </div>
    </div>
  )
}