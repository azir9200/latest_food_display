
import { IMenuItem, IRestaurant } from "@/types/restaurant";
import { createContext, ReactNode, useContext, useState } from "react";

// Mock restaurant data
const mockRestaurants: IRestaurant[] = [
  {
    id: "rest-1",
    name: "The Golden Spoon",
    description:
      "Experience culinary excellence at The Golden Spoon, where traditional recipes meet modern gastronomy. Our chefs craft each dish with passion and precision, using only the freshest locally-sourced ingredients.",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    ],
    location: "Downtown Manhattan",
    address: "123 Gourmet Avenue, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "info@goldenspoon.com",
    website: "https://goldenspoon.com",
    openingHours: "Mon-Sun: 11:00 AM - 11:00 PM",
    specialties: ["Italian Cuisine", "Seafood", "Fine Dining"],
    highlights: ["Michelin Recommended", "Rooftop Seating", "Private Dining"],
    menuItems: [
      {
        id: "menu-1",
        name: "Truffle Risotto",
        description: "Creamy arborio rice with black truffle and parmesan",
        price: 32,
        image:
          "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400",
        category: "Main Course",
      },
      {
        id: "menu-2",
        name: "Grilled Sea Bass",
        description:
          "Fresh sea bass with lemon butter sauce and seasonal vegetables",
        price: 45,
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
        category: "Seafood",
      },
      {
        id: "menu-3",
        name: "Tiramisu",
        description: "Classic Italian dessert with espresso-soaked ladyfingers",
        price: 14,
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
        category: "Dessert",
      },
    ],
    ownerId: "user-1",
    ownerName: "Chef Marco Rossi",
    ownerImage:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-01T14:30:00Z",
  },
];

interface RestaurantContextType {
  restaurants: IRestaurant[];
  userRestaurant: IRestaurant | null;
  createRestaurant: (
    restaurant: Omit<IRestaurant, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateRestaurant: (id: string, data: Partial<IRestaurant>) => void;
  deleteRestaurant: (id: string) => void;
  addMenuItem: (restaurantId: string, item: Omit<IMenuItem, "id">) => void;
  updateMenuItem: (
    restaurantId: string,
    itemId: string,
    data: Partial<IMenuItem>
  ) => void;
  removeMenuItem: (restaurantId: string, itemId: string) => void;
  getRestaurantById: (id: string) => IRestaurant | undefined;
  isPremiumUser: boolean;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined
);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>(mockRestaurants);
  const [isPremiumUser] = useState(true); // Mock premium status
  const currentUserId = "user-1"; // Mock current user

  const userRestaurant =
    restaurants.find((r) => r.ownerId === currentUserId) || null;

  const createRestaurant = (
    restaurant: Omit<IRestaurant, "id" | "createdAt" | "updatedAt">
  ) => {
    const newRestaurant: IRestaurant = {
      ...restaurant,
      id: `rest-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRestaurants((prev) => [...prev, newRestaurant]);
  };

  const updateRestaurant = (id: string, data: Partial<IRestaurant>) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, ...data, updatedAt: new Date().toISOString() } : r
      )
    );
  };

  const deleteRestaurant = (id: string) => {
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  const addMenuItem = (restaurantId: string, item: Omit<IMenuItem, "id">) => {
    const newItem: IMenuItem = { ...item, id: `menu-${Date.now()}` };
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurantId
          ? {
              ...r,
              menuItems: [...r.menuItems, newItem],
              updatedAt: new Date().toISOString(),
            }
          : r
      )
    );
  };

  const updateMenuItem = (
    restaurantId: string,
    itemId: string,
    data: Partial<IMenuItem>
  ) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurantId
          ? {
              ...r,
              menuItems: r.menuItems.map((item) =>
                item.id === itemId ? { ...item, ...data } : item
              ),
              updatedAt: new Date().toISOString(),
            }
          : r
      )
    );
  };

  const removeMenuItem = (restaurantId: string, itemId: string) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurantId
          ? {
              ...r,
              menuItems: r.menuItems.filter((item) => item.id !== itemId),
              updatedAt: new Date().toISOString(),
            }
          : r
      )
    );
  };

  const getRestaurantById = (id: string) =>
    restaurants.find((r) => r.id === id);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        userRestaurant,
        createRestaurant,
        updateRestaurant,
        deleteRestaurant,
        addMenuItem,
        updateMenuItem,
        removeMenuItem,
        getRestaurantById,
        isPremiumUser,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
};
