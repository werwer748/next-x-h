import Home from "@/app/(afterLogin)/home/page";

type TProps = {
  params: {
    username: string;
    id: string;
    photoId: string;
  }
}
/**
 * 폴더 이름의 []안에 값들을 slug라고 함
 * 이 slug값들을 Props의 params에서 꺼내올 수 있다.
 */
export default function Photo({ params }: TProps) {
  return (
    <Home />
  )
}