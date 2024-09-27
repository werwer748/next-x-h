type TRequest = {
  pageParam?: number;
}

//* 페이지 넘버를 받을 수 있도록 수정 - 리액트쿼리가 넘겨줌
export async function getPostRecommends({ pageParam }: TRequest) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends?cursor=${pageParam}`, {
    //? 데이터 캐싱과 관련된 설정
    next: {
      //? 해당 태그를 통해 캐시를 초기화할 수 있다. - revalidateTag를 사용
      //? revalidatePath라는걸 사용하면 이 페이지에 관련된 데이터를 새로고침할 수 도 있다.
      tags: ['posts', 'recommends'],
    },
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json()
}