export interface IMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

export interface IRestaurant {
  id: string;
  name: string;
  description: string;
  images: string[];
  location: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  openingHours: string;
  specialties: string[];
  highlights: string[];
  menuItems?: IMenuItem[];
  ownerId: string;
  ownerName: string;
  ownerImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRestaurantFormData {
  name: string;
  description: string;
  images: File[];
  location: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  openingHours: string;
  specialties: string;
  highlights: string;
}
