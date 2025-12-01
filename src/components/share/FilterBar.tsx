import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ICategory } from "@/types";

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
    <div className="bg-card rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 border border-border/50 p-6 mb-8 space-y-5 animate-slide-up">
      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search for delicious food..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 bg-secondary/30 border-border/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary text-base rounded-xl transition-all"
        />
      </div>

      {/* Category Filters */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-foreground/80">
            Categories
          </label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="gap-2 text-xs"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {showAdvanced ? "Hide" : "Show"} Filters
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedFilter === "All" ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 font-medium hover:scale-105 transition-all duration-200 rounded-full"
            onClick={() => onSelectedFilterChange("All")}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={selectedFilter === cat.id ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 font-medium hover:scale-105 transition-all duration-200 rounded-full"
              onClick={() => onSelectedFilterChange(cat.id)}
            >
              {cat.name}
            </Badge>
          ))}
          <Badge
            variant={selectedFilter === "Others" ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 font-medium hover:scale-105 transition-all duration-200 rounded-full"
            onClick={() => onSelectedFilterChange("Others")}
          >
            Others
          </Badge>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-5 pt-3 border-t border-border/50 animate-scale-in">
          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-foreground/80">
                Price Range
              </span>
              <span className="text-sm font-bold text-primary">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={(value) =>
                onPriceRangeChange(value as [number, number])
              }
              max={1000}
              step={10}
              className="w-full"
            />
          </div>

          {/* Toggle Filters */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant={popularOnly ? "default" : "outline"}
              size="sm"
              className="gap-2 font-medium rounded-full hover:scale-105 transition-all"
              onClick={() => onPopularOnlyChange(!popularOnly)}
            >
              <Flame
                className={`h-4 w-4 ${popularOnly ? "animate-pulse" : ""}`}
              />
              Popular Only 5+
            </Button>
            <Button
              variant={showPremium ? "default" : "outline"}
              size="sm"
              className="gap-2 font-medium rounded-full hover:scale-105 transition-all"
              onClick={() => onShowPremiumChange(!showPremium)}
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
