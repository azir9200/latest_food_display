"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ChefHat,
  Clock,
  Globe,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import ImageGallery from "./ImageGallery";
import MenuItemCard from "./MenuItemCard";
import { IMenuItem, IRestaurant } from "@/types/restaurant";
type RestaurantsProps = {
  restaurant: IRestaurant;
};
const RestaurantDetails = ({ restaurant }: RestaurantsProps) => {
  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The restaurant you're looking for doesn't exist.
          </p>
          <Link href="/restaurants">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Restaurants
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLocationClick = () => {
    const query = encodeURIComponent(restaurant.address || restaurant.location);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    );
  };

  // Group menu items by category
  const menuByCategory = (restaurant.menuItems ?? []).reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, IMenuItem[]>);
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto py-6 space-y-8">
        {/* Back Button */}
        <Link href="/restaurant">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Restaurants
          </Button>
        </Link>

        {/* Image Gallery */}
        <ImageGallery images={restaurant?.images} />

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-display font-bold text-foreground">
                  {restaurant?.name}
                </h1>
                <Badge className="bg-primary text-primary-foreground">
                  <ChefHat className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-foreground">4.8</span>
                  <span className="text-sm">(128 reviews)</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <button
                  onClick={handleLocationClick}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  <span>{restaurant?.location}</span>
                  <Navigation className="h-3 w-3" />
                </button>
              </div>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {restaurant?.description}
            </p>

            {/* Specialties */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Specialties
              </h3>
              <div className="flex flex-wrap gap-2">
                {restaurant?.specialties?.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Highlights */}
            {restaurant?.highlights?.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant?.highlights?.map((highlight) => (
                    <Badge
                      key={highlight}
                      variant="outline"
                      className="px-3 py-1"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Card */}
          <Card className="w-full lg:w-80 h-fit border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Contact & Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {restaurant?.address && (
                <button
                  onClick={handleLocationClick}
                  className="flex items-start gap-3 w-full text-left hover:text-primary transition-colors group"
                >
                  <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm">{restaurant?.address}</span>
                </button>
              )}
              {restaurant?.phone && (
                <a
                  href={`tel:${restaurant?.phone}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{restaurant?.phone}</span>
                </a>
              )}
              {restaurant?.email && (
                <a
                  href={`mailto:${restaurant?.email}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{restaurant?.email}</span>
                </a>
              )}
              {restaurant?.website && (
                <a
                  href={restaurant?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm truncate">
                    {restaurant?.website}
                  </span>
                </a>
              )}
              {restaurant?.openingHours && (
                <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{restaurant?.openingHours}</span>
                </div>
              )}

              {/* Owner Info */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Owner</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={restaurant?.ownerImage} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {restaurant?.ownerName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">
                      {restaurant?.ownerName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Premium Member
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold">Menu</h2>
          {Object?.entries(menuByCategory)?.map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">{category}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items?.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
          {restaurant?.menuItems?.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              No menu items yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetails;
