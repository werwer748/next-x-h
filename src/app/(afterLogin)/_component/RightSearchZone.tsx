"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import style from "./right-search-zone.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";

export default function RightSearchZone() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const onChangeAll = () => {
    let url = `/search?q=${searchParams.get('q')}`;
    if (searchParams.has('f')) {
      url += `&f=${searchParams.get('f')}`;
    }
    router.replace(url);
  };
  
  const onChangeFollow = () => {
    const url = `/search?${searchParams.toString()}&pf=on`;
    /**
     * new URLSearchParams()를 사용하면 새로운 서치파람을 만들 수 있다.
     * => useSearchParams()으로 가져온 searchParams는 Readonly...
     *
     * const newSearchParams = new URLSearchParams(searchParams)
     * => newSearchParams.set('pf','on') = &pf=on
     * => newSearchParams.delete('pf') =
     */
    
    router.replace(url);
  };
  
  //? explore경로 일시 오른쪽 탭에서 제거
  if (pathname === '/explore') return null;
  
  if (pathname === '/search') {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <div>모든 사용자</div>
              <input type="radio" name="pf" defaultChecked onChange={onChangeAll} />
            </div>
            <div className={style.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input type="radio" name="pf" value="on" onChange={onChangeFollow} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{marginBottom: 60, width: 'inherit'}}>
      {/* 탐색하기에서 공통으로 사용되기 떄문에 컴포넌트로 분리 */}
      <SearchForm />
    </div>
  )
}