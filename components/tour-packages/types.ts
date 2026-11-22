export interface ItineraryDay {
  day: number
  title: string
  description: string
  transport?: string | null
  meals?: string | null
  stay?: string | null
  activities?: string[]
}

export interface PackageFaq {
  id?: string
  question: string
  answer: string
  sortOrder?: number
}

export interface HotelInfo {
  name: string | null
  stars: number | null
  room: string | null
  amenities: string[] | null
}

export interface TripFacts {
  groupSize?: string
  languages?: string
  bestSeason?: string
  startingPoint?: string
  endingPoint?: string
  [key: string]: string | undefined
}

export interface TourPackage {
  id: string
  slug: string
  title: string
  subtitle?: string | null
  location: string
  destination: string
  duration: string
  days: number
  nights: number
  travelType: string
  category?: string
  theme?: string
  price: number
  pricePaise: number
  originalPrice?: number
  originalPricePaise?: number | null
  rating: number
  reviewsCount: number
  description: string
  image: string
  images: string[]
  featured?: boolean
  badgeLabel?: string | null
  overview?: string
  highlights?: string[]
  itinerary?: ItineraryDay[]
  inclusions?: string[]
  exclusions?: string[]
  hotelName?: string
  hotelStars?: number
  hotel?: HotelInfo | null
  tripFacts?: TripFacts | null
  faqs?: PackageFaq[]
}

export type SortOption = 'popular' | 'price-low' | 'price-high' | 'duration' | 'newest'
