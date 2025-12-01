"use client";
import { IPost } from "@/types/foodPost";
import FoodPostCard from "../AllPost/FoodPostCard";

interface PostsFeedProps {
  posts: IPost[];
}

const PostsFeed: React.FC<PostsFeedProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">
          No food spots found
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <FoodPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsFeed;
