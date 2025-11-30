import FoodPostCard from "./FoodPostCard";

const PostList = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts.map((p) => (
        <FoodPostCard key={p.id} post={p} />
      ))}
    </div>
  );
};

export default PostList;
