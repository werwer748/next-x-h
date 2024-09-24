import {IPost} from "@/model/Post";

export interface IPostImage {
  link: string,
  imageId: number,
  Post?: IPost
}