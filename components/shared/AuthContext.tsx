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
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
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
