import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageCircle, Star, ThumbsUp } from "lucide-react";

interface IUserData {
  posts: any[];
  comments: any[];
}

const OverviewTab: React.FC<{ userData: IUserData }> = ({ userData }) => {
  const totalPosts = userData?.posts?.length || 0;
  const totalComments = userData?.comments?.length || 0;
  const totalLikes =
    userData?.posts?.reduce((sum, post) => sum + (post.upVotes || 0), 0) || 0;
  const avgRating = userData?.posts?.length
    ? (
        userData.posts.reduce(
          (sum, post) => sum + (post.averageRating || 0),
          0
        ) / userData.posts.length
      ).toFixed(1)
    : "0.0";

  const stats = [
    {
      label: "Total Posts",
      value: totalPosts,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      label: "Total Comments",
      value: totalComments,
      icon: MessageCircle,
      color: "text-green-500",
    },
    {
      label: "Total Likes",
      value: totalLikes,
      icon: ThumbsUp,
      color: "text-red-500",
    },
    {
      label: "Average Rating",
      value: avgRating,
      icon: Star,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewTab;
