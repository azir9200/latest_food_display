"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { Search, SearchCheck, Store } from "lucide-react";
import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { IRestaurant } from "@/types/restaurant";
type RestaurantsProps = {
  restaurants?: IRestaurant[];
};

const Restaurants = ({ restaurants = [] }: RestaurantsProps) => {
  console.log("restaurnt", restaurants);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  const filteredRestaurants = restaurants?.filter(
    (r) =>
      r?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r?.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r?.specialties.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <main className=" max-w-7xl mx-auto py-2 space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary p-8 md:p-12">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Discover Premium
            <br />
            Restaurants
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mb-6">
            Explore curated restaurants from our premium members and discover
            exceptional dining experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search restaurants, locations, cuisines..."
                className="pl-10 h-12 bg-background/80 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button className="h-12 px-6 gap-2">
              <>
                <SearchCheck className="h-4 w-4" />
                Searching
              </>
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-primary/50 to-transparent" />
        </div>
      </div>
      <div>
        {/* <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold">
            {searchQuery ? `Results for "${searchQuery}"` : "All Restaurants"}
          </h2>
        </div> */}

        {filteredRestaurants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Store className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Be the first to create a restaurant profile!"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Restaurants;
