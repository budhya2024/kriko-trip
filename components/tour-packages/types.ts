export interface TourPackage {
  id: string;
  title: string;
  location: string;
  destination: string;
  duration: string;
  days: number;
  nights: number;
  travelType: "Couple" | "Family" | "Honeymoon" | "Leisure" | "Adventure" | "Group";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  featured?: boolean;
}

export type SortOption = "popular" | "price-low" | "price-high" | "duration";
