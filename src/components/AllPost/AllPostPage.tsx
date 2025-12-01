"use client";

import { IPost } from "@/types/foodPost";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import FilterBar from "../share/FilterBar";
import PostsFeed from "../share/PostsFeed";
import { ICategory } from "@/types";

interface IAllPostPros {
  posts: IPost[];
  categoriess: ICategory[];
}
const AllPostPage: React.FC<IAllPostPros> = ({ posts, categoriess }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showPremium, setShowPremium] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [popularOnly, setPopularOnly] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, []);
  const filteredSpots = Array.isArray(posts)
    ? posts.filter((spot) => {
        const matchesSearch =
          spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          spot.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedFilter === "All"
            ? true
            : selectedFilter === "Others"
            ? !categoriess.some((cat) => cat.id === spot.categoryId)
            : spot.categoryId === selectedFilter;

        const matchesPremium = showPremium ? spot.isPremium : true;
        const matchesPrice =
          !spot.price ||
          (spot.price >= priceRange[0] && spot.price <= priceRange[1]);
        const matchesPopularity = popularOnly ? (spot.upVotes || 0) >= 5 : true;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesPremium &&
          matchesPrice &&
          matchesPopularity
        );
      })
    : [];
  console.log("all post page", filteredSpots);

  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="text-center mb-10 space-y-4 animate-slide-up">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-2">
          <Sparkles className="h-4 w-4" />
          <span>Discover Amazing Food</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-primary leading-tight">
          Food Discoveries Feed
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore and share incredible food experiences from around the world.
          Join our community of food enthusiasts!
        </p>
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onSelectedFilterChange={setSelectedFilter}
        categories={categoriess}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        popularOnly={popularOnly}
        onPopularOnlyChange={setPopularOnly}
        showPremium={showPremium}
        onShowPremiumChange={setShowPremium}
      />

      <PostsFeed posts={filteredSpots} />
    </main>
  );
};

export default AllPostPage;
