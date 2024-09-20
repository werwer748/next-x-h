import Link from "next/link";
import style from "@/app/(afterLogin)/_component/post.module.css";
import cx from "classnames";

type TProps = {
  post: {
    postId: number;
    content: string;
    createdAt: Date;
    Images: any[];
    User: {
      id: string;
      nickname: string;
      image: string;
    },
  }
}
export default function PostImages({post}: TProps) {
  //* early return? => 조건처리를 빠르게 해서 원하는 결과만 걸러내기
  if (!post) return null;
  if (!post.Images.length) return null;
  if (post.Images.length === 1) return (
    <Link
      href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
      className={cx(style.postImageSection, style.oneImage)}
      style={{
        backgroundImage: `url(${post.Images[0]?.link})`,
        backgroundSize: "contain",
      }}
    >
      <img src={post.Images[0]?.link} alt={post.Images[0].link}/>
    </Link>
  )
  if (post.Images.length === 2) return (
    <div className={cx(style.postImageSection, style.twoImage)}>
      <Link
        href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
        style={{
          backgroundImage: `url(${post.Images[0]?.link})`,
          backgroundSize: "cover",
        }}
      />
      <Link
        href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
        style={{
          backgroundImage: `url(${post.Images[1]?.link})`,
          backgroundSize: "cover",
        }}
      />
    </div>
  )
  if (post.Images.length === 3) return (
    <div className={cx(style.postImageSection, style.threeImage)}>
      <Link
        href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
        style={{
          backgroundImage: `url(${post.Images[0]?.link})`,
          backgroundSize: "cover",
        }}
      />
      <div>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[1]?.link})`,
            backgroundSize: "cover",
          }}
        />
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[2]?.link})`,
            backgroundSize: "cover",
          }}
        />
      </div>
    </div>
  )
  if (post.Images.length === 4) return (
    <div className={cx(style.postImageSection, style.fourImage)}>
      <Link
        href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
        style={{
          backgroundImage: `url(${post.Images[0]?.link})`,
          backgroundSize: "cover",
        }}
      />
      <Link
        href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
        style={{
          backgroundImage: `url(${post.Images[1]?.link})`,
          backgroundSize: "cover",
        }}
      />
      <Link
        href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
        style={{
          backgroundImage: `url(${post.Images[2]?.link})`,
          backgroundSize: "cover",
        }}
      />
      <Link
        href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[3].imageId}`}
        style={{
          backgroundImage: `url(${post.Images[3]?.link})`,
          backgroundSize: "cover",
        }}
      />
    </div>
  )
  return null;
}