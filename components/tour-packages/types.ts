export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  transport?: string;
  meals?: string;
  stay?: string;
  activities?: string[];
}

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
  images: string[];
  featured?: boolean;
  overview?: string;
  highlights?: string[];
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  hotelName?: string;
  hotelStars?: number;
}

export type SortOption = "popular" | "price-low" | "price-high" | "duration";
