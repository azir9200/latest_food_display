import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IRestaurant } from "@/types/restaurant";

import { ChefHat, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RestaurantCardProps {
  restaurant: IRestaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  // console.log("res card", restaurant);
  if (!restaurant) {
    return null; 
  }
  return (
    <Link href={`/restaurant/${restaurant?.id}`}>
      <Card className="overflow-hidden hover-lift cursor-pointer group border-border/50 bg-card rounded-2xl">
        <div className="relative h-48 overflow-hidden">
          <Image
            height={192}
            width={384}
            src={
              restaurant.images[0] ||
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
            }
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-display font-bold text-white mb-1 truncate">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{restaurant.location}</span>
            </div>
          </div>
          <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground">
            <ChefHat className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        </div>
        <CardContent className="p-4 space-y-3">
          <p className="text-muted-foreground text-sm line-clamp-2">
            {restaurant.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {restaurant.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="h-3.5 w-3.5" />
              <span className="truncate text-xs">
                {restaurant?.openingHours
                  ? restaurant.openingHours.split(":")[0] + "..."
                  : "Hours unavailable"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-sm">4.8</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
