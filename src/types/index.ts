
export type UserRole = "ADMIN" | "USER";

export type UserStatus = "active" | "suspended" | "banned";

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
  status: UserStatus | string;
  joined?: string;
  posts?: number;
  createdAt: string;
  isPremium: boolean;
}

export type ActivityItemType =
  | "approve"
  | "reject"
  | "premium"
  | "user"
  | "comment";

export type ActivityItem = {
  id: string;
  type: ActivityItemType;
  title: string;
  time: string;
};
