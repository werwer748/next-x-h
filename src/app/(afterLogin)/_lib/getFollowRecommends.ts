export async function getFollowRecommends() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/followRecommends`, {
    //! 여기 캐싱은 next에서 관리하는것 리액트 쿼리와는 관련없음!
    next: {
      tags: ['users', 'followRecommends'],
    },
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json()
}