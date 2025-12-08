"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ICategory } from "@/types/comments";
import { Award, Flame, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedFilter: string;
  onSelectedFilterChange: (value: string) => void;
  categories: ICategory[];
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  popularOnly: boolean;
  onPopularOnlyChange: (value: boolean) => void;
  showPremium: boolean;
  onShowPremiumChange: (value: boolean) => void;
}

const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onSelectedFilterChange,
  categories,
  priceRange,
  onPriceRangeChange,
  popularOnly,
  onPopularOnlyChange,
  showPremium,
  onShowPremiumChange,
}: FilterBarProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div
      className="
      rounded-3xl shadow-lg border border-orange-200/40
      bg-white/70 backdrop-blur-xl
      px-6 py-7 space-y-6 transition-all duration-300
      hover:shadow-2xl animate-fade-in
    "
    >
      {/* Search Bar */}
      <div className="relative group">
        <Search
          className="
          absolute left-4 top-1/2 -translate-y-1/2 
          h-5 w-5 text-orange-500 
          group-focus-within:text-orange-600
          transition-all
        "
        />
        <Input
          placeholder="Search delicious food..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            pl-12 h-12 text-base rounded-xl
            bg-gradient-to-r from-orange-50 via-white to-rose-50
            border border-orange-200/40
            shadow-sm
            focus-visible:ring-2 focus-visible:ring-orange-300
            transition-all
          "
        />
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">
            Categories
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="
              text-xs gap-2 rounded-full
              text-orange-600 hover:text-orange-700
              hover:bg-orange-100/50 transition
            "
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {showAdvanced ? "Hide" : "Show"} Filters
          </Button>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedFilter === "All" ? "default" : "outline"}
            className={`
              cursor-pointer px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 hover:scale-105
              ${
                selectedFilter === "All"
                  ? "bg-orange-500 text-white shadow-md"
                  : "border-orange-300/50 text-gray-700 hover:bg-orange-100/50"
              }
            `}
            onClick={() => onSelectedFilterChange("All")}
          >
            All
          </Badge>

          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={selectedFilter === cat.id ? "default" : "outline"}
              className={`
                cursor-pointer px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 hover:scale-105
                ${
                  selectedFilter === cat.id
                    ? "bg-orange-500 text-white shadow-md"
                    : "border-orange-300/50 text-gray-700 hover:bg-orange-100/50"
                }
              `}
              onClick={() => onSelectedFilterChange(cat.id)}
            >
              {cat.name}
            </Badge>
          ))}

          <Badge
            variant={selectedFilter === "Others" ? "default" : "outline"}
            className={`
              cursor-pointer px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 hover:scale-105
              ${
                selectedFilter === "Others"
                  ? "bg-orange-500 text-white shadow-md"
                  : "border-orange-300/50 text-gray-700 hover:bg-orange-100/50"
              }
            `}
            onClick={() => onSelectedFilterChange("Others")}
          >
            Others
          </Badge>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-6 pt-4 border-t border-orange-200/40 animate-scale-in">
          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">
                Price Range
              </span>
              <span className="text-sm font-bold text-orange-600">
                ${priceRange[0]} – ${priceRange[1]}
              </span>
            </div>

            <Slider
              value={priceRange}
              onValueChange={(value) =>
                onPriceRangeChange(value as [number, number])
              }
              max={1000}
              step={10}
              className="w-full accent-orange-500"
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant={popularOnly ? "default" : "outline"}
              size="sm"
              onClick={() => onPopularOnlyChange(!popularOnly)}
              className={`
                gap-2 rounded-full transition-all font-medium
                ${
                  popularOnly
                    ? "bg-orange-500 text-white shadow-md"
                    : "border-orange-300/50 text-gray-700 hover:bg-orange-100/50"
                }
              `}
            >
              <Flame
                className={`h-4 w-4 ${popularOnly ? "animate-pulse" : ""}`}
              />
              Popular 5+
            </Button>

            <Button
              variant={showPremium ? "default" : "outline"}
              size="sm"
              onClick={() => onShowPremiumChange(!showPremium)}
              className={`
                gap-2 rounded-full transition-all font-medium
                ${
                  showPremium
                    ? "bg-purple-500 text-white shadow-md"
                    : "border-purple-300/50 text-gray-700 hover:bg-purple-100/50"
                }
              `}
            >
              <Award className="h-4 w-4" />
              Premium Only
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
