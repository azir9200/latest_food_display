"use client";
import { IPost } from "@/types/foodPost";
import FoodPostCard from "../AllPost/FoodPostCard";

interface PostsFeedProps {
  posts: IPost[];
  loading?: boolean;
  className?: string;
}

const PostsFeed: React.FC<PostsFeedProps> = ({ posts, loading, className }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-700">
          No food spots found 🍽️
        </h3>
        <p className="mt-2 text-gray-500">
          Try adjusting your filters or search criteria.
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div role="feed" className={`space-y-6 min-h-[200px] ${className}`}>
      {posts.map((post, index) => (
        <div
          key={post.id}
          role="article"
          className="animate-fadeIn"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <FoodPostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostsFeed;
