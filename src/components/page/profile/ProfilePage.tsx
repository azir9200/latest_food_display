"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Crown, Lock } from "lucide-react";
import { useState } from "react";

import PostsTab from "./comments/PostsTab";
import { ICategory } from "@/types/comments";
import { IPost } from "@/types/foodPost";
import UserInfoSidebar from "./comments/UserInfoSidebar";
import OverviewTab from "./comments/OverviewTab";
import CommentsTab from "./comments/CommentsTab";
import { IUser } from "@/types";
// interface IComment {
//   id: string;
//   commentText: string;
//   createdAt: string;
//   postTitle: string;
// }

// interface IUserData {
//   id: string;
//   name: string;
//   image: string;
//   isPremium: boolean;
//   createdAt: string;
//   posts: IPost[];
//   comments: IComment[];
// }

interface ProfilePageProps {
  userData: IUser;
  categories?: ICategory[];
}
const ProfilePage: React.FC<ProfilePageProps> = ({
  userData,
  categories = [],
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Premium/Non-Premium Banner */}
      {userData?.isPremium ? (
        <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white p-6 rounded-xl mb-8 shadow-strong animate-scale-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Crown className="h-8 w-8 mr-3 animate-float" />
              <div>
                <h2 className="font-bold text-xl">Premium Member</h2>
                <p className="text-white/90">
                  Enjoy exclusive access to premium food spots and features!
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-amber-600 hover:bg-gray-100"
            >
              Manage Subscription
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-card border-2 border-primary/20 rounded-xl mb-8 p-6 shadow-medium animate-scale-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Lock className="h-8 w-8 mr-3 text-primary" />
              <div>
                <h2 className="font-semibold text-xl">Upgrade to Premium</h2>
                <p className="text-muted-foreground">
                  Get access to exclusive food spots and premium features!
                </p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 shadow-glow hover-lift">
              Upgrade Now
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar - User info */}
        <div className="lg:col-span-3">
          <UserInfoSidebar userData={userData} />
        </div>

        {/* Main content */}
        <div className="lg:col-span-9">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="bg-card rounded-xl shadow-medium border p-4 mb-6 animate-slide-up">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="posts"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  Posts ({userData?.posts?.length || 0})
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  Comments ({userData?.comments?.length || 0})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="animate-scale-in">
              <OverviewTab userData={userData} />
            </TabsContent>

            <TabsContent value="posts" className="animate-scale-in">
              <PostsTab userData={userData} categories={categories} />
            </TabsContent>

            <TabsContent value="comments" className="animate-scale-in">
              <CommentsTab userData={userData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;