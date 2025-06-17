
export type ActivityType =
  | "approve"
  | "premium"
  | "reject"
  | "user"
  | "comment";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  time: string;
}

export const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "approve",
    title: 'Approved post "The Art of Perfect French Croissants"',
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "premium",
    title: 'Marked "10 Summer Cocktails to Beat the Heat" as premium',
    time: "3 hours ago",
  },
  {
    id: "3",
    type: "reject",
    title: 'Rejected post "Why Fast Food Is Better Than Home Cooking"',
    time: "5 hours ago",
  },
  {
    id: "4",
    type: "user",
    title: "New user registered: Sarah Johnson",
    time: "1 day ago",
  },
  {
    id: "5",
    type: "comment",
    title: 'Moderated comment on "The Ultimate Guide to Homemade Pizza"',
    time: "2 days ago",
  },
];

export const mockStats = {
  posts: {
    total: 342,
    pending: 18,
    growth: 12,
  },
  users: {
    total: 1526,
    active: 1490,
    growth: 8,
  },
  comments: {
    total: 4728,
    flagged: 23,
    growth: 15,
  },
  premium: {
    total: 78,
    growth: 23,
  },
};
