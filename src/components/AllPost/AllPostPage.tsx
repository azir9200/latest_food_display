"use client";

import { IPost } from "@/types/foodPost";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import FilterBar from "../share/FilterBar";
import PostsFeed from "../share/PostsFeed";
import { ICategory } from "@/types/comments";
import PaginationHelp from "../pagination/paginationHelper";

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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilter, priceRange, popularOnly, showPremium]);

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
          (spot.description ?? "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

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

  const totalPages = Math.ceil(filteredSpots.length / postsPerPage);

  const paginatedPosts = filteredSpots.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 py-10 px-4">
      {/* Floating Background Blobs */}
      <div className="absolute -top-10 -left-10 w-60 h-60 bg-orange-200 opacity-30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-rose-200 opacity-30 blur-3xl rounded-full animate-pulse"></div>
      <section className="relative space-y-6 animate-fade-in max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="flex justify-between items-center">
          <div className="inline-flex items-center gap-2 text-orange-600 bg-orange-100 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:bg-orange-200 transition">
            <Sparkles className="h-4 w-4" />
            <span>Discover Amazing Food</span>
          </div>

          <div className="inline-flex items-center gap-2 text-rose-600 bg-rose-100 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:bg-rose-200 transition">
            <Sparkles className="h-4 w-4" />
            <span>Food Discoveries Feed</span>
          </div>
        </div>

        {/* Title / Subtitle */}
        <p className="text-xl md:text-2xl text-gray-800 font-semibold animate-slide-up">
          Explore and share incredible food experiences from around the world.
        </p>
        <p className="text-gray-600 max-w-2xl animate-slide-up delay-100">
          Join our community of food lovers and uncover exciting dishes,
          authentic cuisines and hidden gems!
        </p>
      </section>

      {/* Filter Bar */}

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-orange-100 animate-scale-in">
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
      </div>

      {/* Posts Feed */}
      <div className="max-w-5xl mx-auto mt-12">
        <PostsFeed posts={paginatedPosts} />
      </div>
      {/* Pagination */}
      <PaginationHelp
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />
    </main>
  );
};

export default AllPostPage;
