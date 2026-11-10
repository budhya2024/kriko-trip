"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface TripHistoryItem {
  id: string;
  bookingId: string;
  packageTitle: string;
  destination: string;
  duration: string;
  dates: string;
  status: "Confirmed" | "Completed" | "Cancelled";
  amount: number;
  pointsEarned: number;
  image: string;
  travellers?: string;
  hotelCategory?: string;
  mealPlan?: string;
  pickupPoint?: string;
  inclusions?: string[];
  paymentMode?: string;
  appliedCoupon?: {
    code: string;
    discountAmount: number;
  };
  loyaltyRedeemed?: {
    points: number;
    discountAmount: number;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location?: string;
  bio?: string;
  loyaltyPoints: number;
  tier: "Silver Explorer" | "Gold Explorer" | "Platinum Elite";
  trips: TripHistoryItem[];
}

export const DEFAULT_MOCK_USER: UserProfile = {
  name: "Rahul Sharma",
  email: "rahul.sharma@gmail.com",
  phone: "+91 98765 43210",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
  location: "Kolkata, West Bengal",
  bio: "Passionate traveler & nature lover. Exploring the world one trip at a time.",
  loyaltyPoints: 1450,
  tier: "Gold Explorer",
  trips: [
    {
      id: "trip-1",
      bookingId: "KT-98214",
      packageTitle: "Andaman Wonders & Havelock Island",
      destination: "Andaman & Nicobar Islands",
      duration: "6 Days / 5 Nights",
      dates: "15 Dec - 20 Dec 2026",
      status: "Confirmed",
      amount: 28999,
      pointsEarned: 290,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      travellers: "2 Adults (Double Sharing)",
      hotelCategory: "4-Star Beachfront Luxury Resort",
      mealPlan: "Breakfast & Dinner Included (MAP Plan)",
      pickupPoint: "Veer Savarkar Airport (IXZ), Port Blair",
      paymentMode: "UPI / Net Banking (Paid in Full)",
      appliedCoupon: {
        code: "KRIKO10",
        discountAmount: 3200,
      },
      loyaltyRedeemed: {
        points: 500,
        discountAmount: 500,
      },
      inclusions: [
        "Private AC Sedan for all transfers",
        "Inter-Island Luxury Ferry (Makruzz / Nautika)",
        "Radhanagar Beach & Elephant Beach Excursions",
        "Complimentary Snorkeling Session",
        "24/7 Dedicated Holiday Concierge",
      ],
    },
    {
      id: "trip-2",
      bookingId: "KT-84192",
      packageTitle: "Sundarban Luxury Eco Resort & Safari",
      destination: "Sundarban, West Bengal",
      duration: "3 Days / 2 Nights",
      dates: "10 Oct - 12 Oct 2026",
      status: "Completed",
      amount: 14500,
      pointsEarned: 145,
      image:
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
      travellers: "2 Adults, 1 Child",
      hotelCategory: "Luxury Riverfront Eco Cottage",
      mealPlan: "All Meals Included (Buffet Style)",
      pickupPoint: "Science City, Kolkata",
      paymentMode: "Credit Card (Paid in Full)",
      appliedCoupon: {
        code: "EXPLORE2000",
        discountAmount: 2000,
      },
      inclusions: [
        "Dedicated Motorized Safari Boat",
        "Sajnekhali & Sudhanyakhali Watch Tower Entry",
        "Govt. Forest Guide & Permits",
        "Local Baul Folk Music Evening",
      ],
    },
    {
      id: "trip-3",
      bookingId: "KT-71043",
      packageTitle: "Kashmir Valley Paradise & Gulmarg Snow",
      destination: "Srinagar & Gulmarg, Kashmir",
      duration: "6 Days / 5 Nights",
      dates: "18 May - 23 May 2026",
      status: "Completed",
      amount: 32500,
      pointsEarned: 325,
      image:
        "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
      travellers: "2 Adults",
      hotelCategory: "Dal Lake Heritage Houseboat & 4-Star Hotel",
      mealPlan: "Daily Buffet Breakfast & Dinner",
      pickupPoint: "Sheikh ul-Alam Airport (SXR), Srinagar",
      paymentMode: "Net Banking (Paid in Full)",
      appliedCoupon: {
        code: "FESTIVE15",
        discountAmount: 5000,
      },
      loyaltyRedeemed: {
        points: 1000,
        discountAmount: 1000,
      },
      inclusions: [
        "1 Night Houseboat Stay with Shikara Ride",
        "Gulmarg Gondola Phase 1 Cable Car Tickets",
        "Pahalgam Betaab Valley Sightseeing",
        "Heated AC Vehicle with Chauffeur",
      ],
    },
  ],
};

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isProfileDrawerOpen: boolean;
  openProfileDrawer: () => void;
  closeProfileDrawer: () => void;
  login: (customData?: Partial<UserProfile>) => void;
  logout: () => void;
  updateAvatar: (avatarDataUrl: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "krikotrip_user_profile";
const LOCAL_STORAGE_LOGGED_IN = "krikotrip_is_logged_in";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage on client side
  useEffect(() => {
    try {
      const savedLoggedIn = localStorage.getItem(LOCAL_STORAGE_LOGGED_IN);
      const savedUserStr = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (savedLoggedIn === "true") {
        setIsLoggedIn(true);
        if (savedUserStr) {
          setUser(JSON.parse(savedUserStr));
        } else {
          setUser(DEFAULT_MOCK_USER);
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (isLoggedIn && user) {
        localStorage.setItem(LOCAL_STORAGE_LOGGED_IN, "true");
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_LOGGED_IN);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
  }, [user, isLoggedIn, isInitialized]);

  const openProfileDrawer = () => setIsProfileDrawerOpen(true);
  const closeProfileDrawer = () => setIsProfileDrawerOpen(false);

  const login = (customData?: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      ...DEFAULT_MOCK_USER,
      ...customData,
    };
    setUser(newUser);
    setIsLoggedIn(true);
    setIsProfileDrawerOpen(true); // Automatically open the profile right bar after fake login!
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsProfileDrawerOpen(false);
  };

  const updateAvatar = (avatarDataUrl: string) => {
    setUser((prev) => (prev ? { ...prev, avatar: avatarDataUrl } : null));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isProfileDrawerOpen,
        openProfileDrawer,
        closeProfileDrawer,
        login,
        logout,
        updateAvatar,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

