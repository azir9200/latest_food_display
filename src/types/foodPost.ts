import { IUser } from ".";
import { ICategory, IComments } from "./comments";

export interface FoodPostCardProps {
  post: IPost;
}
export type PostStatus = "pending" | "approved" | "rejected";

export interface IPost {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
  categoryId: string;
  isPremium: boolean;
  approved: boolean;
  updatedAt: string;
  userId: string;
  user?: IUser;
  category?: ICategory;
  votes?: {
    vote: "UP" | "DOWN";
  }[];
  ratings?: {
    rating: number;
  }[];
  comments?: IComments[];
  status?: string;
  upVotes: number;
  downVotes: number;
  averageRating: number;
  totalComments: number;
  createdAt: Date;
}

export interface FoodSpotCardProps {
  spot: {
    id: string;
    title: string;
    description: string;
    image: string;
    averageRating: number;
    price: number;
    category?: ICategory;
    location: string;
    isPremium?: boolean;
    upVotes: number;
    downVotes: number;
    totalComments: number;
    className?: string;
  };
}
