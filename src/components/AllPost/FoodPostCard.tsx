"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import {
  createComment,
  createRating,
  createVote,
} from "@/services/postService";
import { formatDistanceToNow } from "date-fns";
import {
  Bookmark,
  BookmarkCheck,
  DollarSign,
  Heart,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Navigation,
  Send,
  Share2,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { FoodPostCardProps } from "@/types/foodPost";
import PremiumLockOverlay from "../premium/PremiumOverlay";
import PremiumBadge from "../premium/PremiumBage";

const FoodPostCard: React.FC<FoodPostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const [showRatingPanel, setShowRatingPanel] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.upVotes);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comments, setComments] = useState(post.comments || []);
  const [totalComments, setTotalComments] = useState(post.totalComments);

  const handleVote = async (type: "UP" | "DOWN") => {
    const payload = {
      postId: post.id,
      vote: type,
    };
    const prevLiked = isLiked;
    setIsLiked((prev) => !prev);
    setLocalLikes((count) => count + (prevLiked ? -1 : 1));
    try {
      await createVote(payload);
    } catch (error: any) {
      console.log(error);
      setIsLiked(prevLiked);
      setLocalLikes((count) => count + (prevLiked ? 1 : -1));
      toast.error("Failed to register vote");
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const payload = {
      postId: post.id,
      commentText: newComment.trim(),
    };
    try {
      await createComment(payload);
      const optimistic = {
        id: Math.random().toString(36).slice(2),
        commentText: newComment.trim(),
        createdAt: new Date().toISOString(),
        user: {
          name: user?.name ?? "Unknown User",
          image: (user as any)?.image,
        },
      };
      setComments((prev) => [...prev, optimistic]);
      setTotalComments((n) => n + 1);
      setNewComment("");
      toast.success("Comment added");
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to add comment");
    }
  };

  const handleRatePost = async (rating: number) => {
    const payload = {
      postId: post.id,
      rating,
    };
    try {
      await createRating(payload);
      setSelectedRating(rating);
      setShowRatingPanel(false);
      toast.success(`You rated this ${rating} stars`);
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to submit rating");
    }
  };

  const handleShareClick = () => {
    const shareUrl = `${window.location.origin}/allpost?postId=${post.id}`;

    if (navigator.share) {
      navigator
        .share({
          title: `Food Discovery by ${post?.user?.name || "JUNAYET"}`,
          text: post?.description?.substring(0, 100) + "...",
          url: shareUrl,
        })
        .then(() => toast.success("Post shared successfully"))
        .catch((error) => {
          console.error("Error sharing:", error);
          copyToClipboard(shareUrl);
        });
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Share link copied to clipboard!");
      },
      () => {
        toast.error("Failed to copy link");
      }
    );
  };

  const handleLocationClick = () => {
    const query = encodeURIComponent(post.location);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    );
  };

  // Generate star rating display
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const isContentLocked = post.isPremium && user?.isPremium !== true;
  return (
    <Card className="overflow-hidden transition-all duration-500 hover:shadow-strong border-border/50 bg-card hover-lift rounded-2xl group animate-slide-up relative">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all">
                <AvatarImage
                  src={
                    post.user?.image ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user?.email}`
                  }
                  alt={post.user?.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold">
                  {post.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              {/* <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card">
                azir klkjkjl
              </div> */}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground truncate hover:text-primary transition-colors cursor-pointer">
                {post.user?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </div>
              <button
                onClick={handleLocationClick}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-1 group/location font-medium"
              >
                <MapPin className="h-3.5 w-3.5" />
                <span className="truncate underline decoration-dotted underline-offset-2">
                  {post.location}
                </span>
                <Navigation className="h-3.5 w-3.5 group-hover/location:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              {renderRating(post.averageRating)}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            {post.isPremium && <PremiumBadge />}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        <div className="flex justify-between">
          <div
            className={
              isContentLocked ? "blur-sm select-none pointer-events-none" : ""
            }
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-3 leading-tight hover:text-primary transition-colors cursor-pointer">
              {post.title}
            </h2>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-base">
              {isContentLocked
                ? post.description.substring(0, 50) + "..."
                : post.description}
            </p>
          </div>
          <div>restaurant {post?.restaurant?.name}</div>
        </div>
        <div className="relative rounded-2xl overflow-hidden group/image shadow-md">
          <Image
            src={
              post.image ||
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop"
            }
            height={600}
            width={600}
            alt={post.title}
            className={`w-full h-[420px] object-cover transition-transform duration-700 group-hover/image:scale-110 ${
              isContentLocked ? "blur-md" : ""
            }`}
          />
          {isContentLocked && (
            <PremiumLockOverlay onUpgrade={() => router.push("/premium")} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
          {!isContentLocked && (
            <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 opacity-0 group-hover/image:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/image:translate-y-0">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="font-bold text-lg text-foreground">
                {post.price}
              </span>
            </div>
          )}
        </div>

        {showRatingPanel && (
          <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 p-5 rounded-2xl border border-border/50 animate-scale-in shadow-inner">
            <p className="text-sm font-semibold mb-4 text-center">
              Rate your experience
            </p>
            <div className="flex gap-3 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatePost(star)}
                  className="focus:outline-none transition-all hover:scale-125 active:scale-95 duration-200"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= selectedRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300 hover:text-amber-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          className={`flex justify-between items-center pt-3 border-t border-border/30 ${
            isContentLocked ? "blur-sm select-none pointer-events-none" : ""
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleVote("UP")}
              className="flex items-center gap-2 group/like transition-all hover:scale-105"
              disabled={isContentLocked}
            >
              <Heart
                className={`h-5 w-5 transition-all ${
                  isLiked
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground group-hover/like:text-red-500"
                }`}
              />
              <span
                className={`font-bold text-sm ${
                  isLiked ? "text-red-500" : "text-foreground"
                }`}
              >
                {localLikes}
              </span>
            </button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="font-semibold text-sm text-foreground">
                {totalComments}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-lg font-bold text-primary">
              {isContentLocked ? "---" : post.price}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter
        className={`border-t border-border/30 pt-4 flex-col gap-4 bg-secondary/20 ${
          isContentLocked ? "blur-sm select-none pointer-events-none" : ""
        }`}
      >
        <div className="flex justify-between w-full gap-2">
          <div className="flex gap-1 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="gap-2 hover:bg-primary/10 hover:text-primary transition-all rounded-full font-medium"
              disabled={isContentLocked}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Comment</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRatingPanel(!showRatingPanel)}
              className="gap-2 hover:bg-amber-500/10 hover:text-amber-600 transition-all rounded-full font-medium"
              disabled={isContentLocked}
            >
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Rate</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareClick}
              className="gap-2 hover:bg-blue-500/10 hover:text-blue-600 transition-all rounded-full font-medium"
              disabled={isContentLocked}
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>

          <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setIsSaved(!isSaved);
              toast.success(
                isSaved ? "Removed from bookmarks" : "Saved to bookmarks 🔖"
              );
            }}
            className="gap-2 rounded-full font-medium"
            disabled={isContentLocked}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 fill-current" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {isSaved ? "Saved" : "Save"}
            </span>
          </Button>
        </div>

        {showComments && (
          <div className="w-full space-y-4 pt-4 border-t border-border/30 animate-slide-up">
            {comments?.map((comment) => (
              <div key={comment.id} className="flex gap-3 group/comment">
                <Avatar className="h-9 w-9 ring-2 ring-transparent group-hover/comment:ring-primary/10 transition-all">
                  <AvatarImage src={comment.user?.image} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                    {comment.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-secondary/40 rounded-2xl p-4 group-hover/comment:bg-secondary/60 transition-colors">
                    <div className="font-semibold text-sm text-foreground">
                      {comment.user?.name}
                    </div>
                    <p className="text-sm text-foreground/90 mt-1 leading-relaxed">
                      {comment.commentText}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                    <button className="hover:text-primary transition-colors font-medium">
                      Like
                    </button>
                    <button className="hover:text-primary transition-colors font-medium">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 pt-2">
              <Avatar className="h-9 w-9 ring-2 ring-primary/10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser" />
                <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                  You
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <Input
                  placeholder="Add a thoughtful comment..."
                  className="pr-12 bg-secondary/40 border-border/50 rounded-full focus-visible:ring-2 focus-visible:ring-primary/20 font-medium"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full transition-all"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default FoodPostCard;
