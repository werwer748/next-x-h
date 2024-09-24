//* useQuery에서 사용시 함수 인자로 쿼리키가 넘어온다.
import {QueryFunction} from "@tanstack/react-query";
import {IPost} from "@/model/Post";

export const getSearchResult:
// 타이핑
  QueryFunction<IPost[], [_1: string, _2: string, searchParams: { q: string, f?: string, pf?: string }]>
  //
  = async ({ queryKey }) => {
  //? _1: "posts", _2: "search", searchParams
  const [_1, _2, searchParams] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchParams.q}?${searchParams.toString()}`, {
    //! 여기 캐싱은 next에서 관리하는것 리액트 쿼리와는 관련없음!
    next: {
      //? next의 tags에는 객체가 들어갈 수 없어서 스트링을 빼서 넣어준다.
      tags: ["posts", "search", searchParams.q],
    },
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json()
}