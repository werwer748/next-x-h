//? 객체 타이핑 시 interface를 많이 사용한다.
import {IUser} from "@/model/User";
import {IPostImage} from "@/model/PostImage";

export interface IPost {
  postId: number,
  content: string,
  createdAt: Date,
  Images: IPostImage[],
  User: IUser
}