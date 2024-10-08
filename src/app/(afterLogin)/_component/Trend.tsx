import Link from "next/link";
import style from "./trend.module.css";
import {IHashtag} from "@/model/Hashtag";

type TProps = {
  trend: IHashtag
}

export default function Trend({ trend }: TProps) {
  return (
    <Link href={`/search?q=${trend.title}`} className={style.container}>
      <div className={style.count}>실시간 트렌드</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  )
}