import { IUser } from ".";
import { IPost } from "./foodPost";

export type IComments = {
  id: string;
  user: IUser;
  commentText: string;
  createdAt: Date | string;
  post: IPost;
};

export interface ICategory {
  id: string;
  name: string;
  _count?: {
    posts: number;
  };
}
