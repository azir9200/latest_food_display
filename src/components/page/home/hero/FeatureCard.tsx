"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FoodSpotCard from "../foodSpotList/FoodSpotCard";
import { IPost } from "@/types/foodPost";

interface FeaturedSpotsProps {
  user: IUser;
  posts: IPost[];
}

const FeaturedSpots: React.FC<FeaturedSpotsProps> = ({ user, posts }) => {
  const safePosts = Array.isArray(posts) ? posts : [];

  const premiumPosts = safePosts
    ?.filter((post) => post?.isPremium)
    ?.sort((a, b) => (b.upVotes ?? 0) - (a.upVotes ?? 0))
    ?.slice(0, 2);

  const nonPremiumPosts = safePosts
    ?.filter((post) => !post.isPremium)
    ?.sort((a, b) => (b.upVotes ?? 0) - (a.upVotes ?? 0))
    ?.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8  space-y-8">
      {/* 🔥 Popular Food Spots */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Popular Food Spots
          </h2>

          <Link href="/allpost">
            <Button className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nonPremiumPosts?.map((spot) => (
            <FoodSpotCard
              key={spot.id}
              spot={{
                id: spot.id,
                title: spot.title,
                description: spot.description ?? "",
                image: spot.image ?? null,
                averageRating: spot.averageRating ?? 0,
                price: spot.price ?? 0,
                category: spot.category,
                location: spot.location ?? "Unknown",
                isPremium: spot.isPremium ?? false,
                upVotes: spot.upVotes ?? 0,
                downVotes: spot.downVotes ?? 0,
                totalComments: spot.totalComments ?? 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* 🌟 Premium Section */}
      <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-md p-8 overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-300/20 rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-yellow-400/25 rounded-full -translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Premium Spots
            </h2>
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-semibold rounded-full shadow px-3 py-1 text-sm">
              Exclusive
            </span>
          </div>

          <p className="text-gray-700 mb-8 max-w-2xl">
            Explore exclusive dishes and top-rated food experiences available
            only to premium members. Upgrade your account to unlock these gems!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumPosts?.map((spot) => (
              <div key={spot.id} className="relative group">
                <FoodSpotCard
                  spot={{
                    id: spot.id,
                    title: spot.title,
                    description: spot.description ?? "",
                    image: spot.image ?? null,
                    averageRating: spot.averageRating ?? 0,
                    price: spot.price ?? 0,
                    category: spot.category,
                    location: spot.location ?? "Unknown",
                    isPremium: spot.isPremium ?? false,
                    upVotes: spot.upVotes ?? 0,
                    downVotes: spot.downVotes ?? 0,
                    totalComments: spot.totalComments ?? 0,
                  }}
                />

                {/* 🔒 Premium Lock Overlay */}
                {!user?.isPremium && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl transition-all duration-300">
                    <div className="bg-white/10 backdrop-blur-md px-6 py-6 rounded-2xl shadow-lg text-center max-w-xs mx-auto">
                      <h3 className="text-white text-xl font-bold mb-3">
                        Premium Content
                      </h3>

                      <Link href="/premium">
                        <Button className="rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-semibold hover:scale-105 transition-all">
                          Upgrade to Unlock
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSpots;
