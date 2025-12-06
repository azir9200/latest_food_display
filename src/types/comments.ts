import { IPost } from "./foodPost";

export type ICommentUser = {
  // id: string;
  name: string;
  image?: string | null;
  email?: string;
};

export type IComments = {
  id: string;
  user: ICommentUser;
  commentText?: string;
  content?: string;
  postTitle?: string;
  onDelete: (id: string) => void;
  onEdit?: (id: string, newContent: string) => void;
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
