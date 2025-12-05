import { Star, Users, Gift, MapPin } from "lucide-react";
export const benefits = [
  {
    id: 1,
    title: "Unlimited Post Views",
    desc: "See every food post, photos, and long reviews without limits.",
    icon: <Star size={20} />,
  },
  {
    id: 2,
    title: "Exclusive Restaurant Offers",
    desc: "Access specials and direct offers from restaurants who advertise to premium members.",
    icon: <Gift size={20} />,
  },
  {
    id: 3,
    title: "Priority Support",
    desc: "Get faster support and dedicated help for account or content issues.",
    icon: <Users size={20} />,
  },
  {
    id: 4,
    title: "Claim Restaurant Profile",
    desc: "Premium accounts may apply to claim a restaurant page and get owner tools (verification required)",
    icon: <MapPin size={20} />,
  },
];

export const features = [
  "Unlimited feed access",
  "High-resolution image uploads",
  "Advanced search & filters",
  "Save & organize favorite dishes",
  "Analytics for claimed restaurants",
  "Discount coupons and partner deals",
];
