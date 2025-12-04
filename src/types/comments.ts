
import { IPost } from "./foodPost";

export type ICommentUser = {
  id: string;
  name: string;
  image?: string | null;
};

export type IComments = {
  id: string;
   user: ICommentUser;
  commentText: string;
  createdAt: string;
  post?: IPost;
};

export interface ICategory {
  id: string;
  name: string;
  _count?: {
    posts: number;
  };
}
