import style from "./search.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Post from "@/app/(afterLogin)/_component/Post";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Tab from "@/app/(afterLogin)/search/_component/Tab";
import SearchResult from "@/app/(afterLogin)/search/_component/SearchResult";

type TProps = {
  searchParams: { q: string, f?: string, pf?: string };
};

//? 기본적으로 props에 searchParams이 넘어오게 되어있다.
export default function Search({ searchParams }: TProps) {
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton/>
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q}/>
          </div>
        </div>
        {/* 홈에서 사용하는 탭과는 다름 - 수행해야하는 기능이 다르다. */}
        <Tab/>
      </div>
      <div className={style.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  )
}