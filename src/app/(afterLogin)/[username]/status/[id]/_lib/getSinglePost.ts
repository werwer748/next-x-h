import {QueryFunction} from "@tanstack/react-query";
import {IPost} from "@/model/Post";

export const getSinglePost
  : QueryFunction<IPost, [_1: string, _2: string]>
  = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
    next: {
      tags: ['posts', id],
    },
    /**
     * cache: 'no-store'의 경우
     * => 데이터를 캐싱하지 않고 항상 요청마다 다시 데이터를 가지고 왔었음
     *
     * 해당 설정을 없앴기 때문에 최초에 가져온 데이터를
     * revalidate 할 때 까지 재사용 한다.
     */
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}