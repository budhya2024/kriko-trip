'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  fetchMyProfile,
  updateMyProfile,
  type CustomerProfileData,
  type UpdateCustomerProfilePayload,
} from '@/lib/api/customer'
import { authClient, clearAccessToken } from '@/lib/auth/client'

export interface TripHistoryItem {
  id: string
  bookingId: string
  packageTitle: string
  destination: string
  duration: string
  dates: string
  status: 'Confirmed' | 'Completed' | 'Cancelled'
  amount: number
  pointsEarned: number
  image: string
  travellers?: string
  hotelCategory?: string
  mealPlan?: string
  pickupPoint?: string
  inclusions?: string[]
  paymentMode?: string
  appliedCoupon?: {
    code: string
    discountAmount: number
  }
  loyaltyRedeemed?: {
    points: number
    discountAmount: number
  }
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  avatar: string
  location?: string
  bio?: string
  loyaltyPoints: number
  tier: 'Silver Explorer' | 'Gold Explorer' | 'Platinum Elite'
  trips: TripHistoryItem[]
}

interface CompleteProfileInput {
  name: string
  phoneCountryCode: string
  phone: string
  location?: string
}

interface AuthResult {
  success: boolean
  error?: string
}

interface VerifyOtpResult extends AuthResult {
  profileComplete?: boolean
}

interface AuthContextType {
  user: UserProfile | null
  isLoggedIn: boolean
  isAuthLoading: boolean
  profileComplete: boolean
  isProfileDrawerOpen: boolean
  openProfileDrawer: () => void
  closeProfileDrawer: () => void
  sendEmailOtp: (email: string) => Promise<AuthResult>
  verifyEmailOtp: (email: string, otp: string) => Promise<VerifyOtpResult>
  signInWithGoogle: (callbackPath?: string) => Promise<void>
  completeProfile: (input: CompleteProfileInput) => Promise<AuthResult>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  updateAvatar: (avatarDataUrl: string) => void
  logout: () => Promise<void>
  refreshMe: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function formatTier(
  tier: 'silver_explorer' | 'gold_explorer' | 'platinum_elite',
): 'Silver Explorer' | 'Gold Explorer' | 'Platinum Elite' {
  switch (tier) {
    case 'platinum_elite':
      return 'Platinum Elite'
    case 'gold_explorer':
      return 'Gold Explorer'
    default:
      return 'Silver Explorer'
  }
}

function mapProfileToUser(data: CustomerProfileData): UserProfile {
  const fullPhone = [data.phoneCountryCode, data.phone].filter(Boolean).join(' ')
  return {
    name: data.name,
    email: data.email,
    phone: fullPhone,
    avatar: data.avatarUrl || '',
    location: data.location || '',
    bio: data.bio || '',
    loyaltyPoints: data.loyalty.pointsBalance,
    tier: formatTier(data.loyalty.tier),
    trips: [],
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [profileComplete, setProfileComplete] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false)
  const isFetchingProfileRef = useRef(false)

  const session = authClient.useSession()

  useEffect(() => {
    try {
      localStorage.removeItem('krikotrip_user_profile')
      localStorage.removeItem('krikotrip_is_logged_in')
    } catch {
    }
  }, [])

  const loadProfile = useCallback(async () => {
    if (isFetchingProfileRef.current) {
      return
    }
    isFetchingProfileRef.current = true
    try {
      const data = await fetchMyProfile()
      setUser(mapProfileToUser(data))
      setProfileComplete(data.profileComplete)
    } catch {
      setUser(null)
      setProfileComplete(false)
    } finally {
      isFetchingProfileRef.current = false
      setIsAuthLoading(false)
    }
  }, [])

  const [prevSessionUser, setPrevSessionUser] = useState(session.data?.user)
  if (prevSessionUser !== session.data?.user) {
    setPrevSessionUser(session.data?.user)
    if (!session.data?.user && user !== null) {
      setUser(null)
      setProfileComplete(false)
      setIsAuthLoading(false)
    }
  }

  useEffect(() => {
    let isCancelled = false

    if (!session.isPending && session.data?.user) {
      void (async () => {
        try {
          const profile = await fetchMyProfile()
          if (!isCancelled) {
            setUser(mapProfileToUser(profile))
            setProfileComplete(profile.profileComplete)
          }
        } catch {
          if (!isCancelled) {
            setUser(null)
            setProfileComplete(false)
          }
        } finally {
          if (!isCancelled) {
            setIsAuthLoading(false)
          }
        }
      })()
    }

    return () => {
      isCancelled = true
    }
  }, [session.isPending, session.data?.user])

  const openProfileDrawer = useCallback(() => setIsProfileDrawerOpen(true), [])
  const closeProfileDrawer = useCallback(() => setIsProfileDrawerOpen(false), [])

  const sendEmailOtp = useCallback(async (email: string): Promise<AuthResult> => {
    try {
      const res = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
      })
      if (res?.error) {
        return { success: false, error: res.error.message || 'Failed to send verification code.' }
      }
      return { success: true }
    } catch {
      return { success: false, error: 'Failed to send verification code. Please check your connection.' }
    }
  }, [])

  const verifyEmailOtp = useCallback(
    async (email: string, otp: string): Promise<VerifyOtpResult> => {
      try {
        const res = await authClient.signIn.emailOtp({ email, otp })
        if (res?.error) {
          const msg = res.error.message?.toLowerCase() ?? ''
          if (msg.includes('invalid') || msg.includes('otp') || msg.includes('code')) {
            return { success: false, error: 'Invalid or expired verification code.' }
          }
          if (msg.includes('rate limit') || msg.includes('too many')) {
            return { success: false, error: 'Too many attempts. Please try again later.' }
          }
          return { success: false, error: res.error.message || 'Verification failed.' }
        }

        try {
          const profileData = await fetchMyProfile()
          setUser(mapProfileToUser(profileData))
          setProfileComplete(profileData.profileComplete)
          return { success: true, profileComplete: profileData.profileComplete }
        } catch {
          return { success: true, profileComplete: false }
        }
      } catch {
        return { success: false, error: 'Verification failed. Please try again.' }
      }
    },
    [],
  )

  const signInWithGoogle = useCallback(async (callbackPath = '/'): Promise<void> => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const callbackURL = `${origin}${callbackPath.startsWith('/') ? callbackPath : `/${callbackPath}`}`
    await authClient.signIn.social({
      provider: 'google',
      callbackURL,
    })
  }, [])

  const completeProfile = useCallback(
    async (input: CompleteProfileInput): Promise<AuthResult> => {
      try {
        const payload: UpdateCustomerProfilePayload = {
          name: input.name,
          phoneCountryCode: input.phoneCountryCode,
          phone: input.phone,
          location: input.location || null,
        }
        const updated = await updateMyProfile(payload)
        setUser(mapProfileToUser(updated))
        setProfileComplete(updated.profileComplete)
        return { success: true }
      } catch {
        return { success: false, error: 'Failed to save profile. Please try again.' }
      }
    },
    [],
  )

  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<void> => {
    try {
      const payload: UpdateCustomerProfilePayload = {}
      if (updates.name !== undefined) {
        payload.name = updates.name
      }
      if (updates.phone !== undefined) {
        payload.phone = updates.phone
      }
      if (updates.location !== undefined) {
        payload.location = updates.location
      }
      if (updates.bio !== undefined) {
        payload.bio = updates.bio
      }
      const updated = await updateMyProfile(payload)
      setUser(mapProfileToUser(updated))
      setProfileComplete(updated.profileComplete)
    } catch (err: unknown) {
      throw err
    }
  }, [])

  const updateAvatar = useCallback((avatarDataUrl: string) => {
    setUser((prev) => (prev ? { ...prev, avatar: avatarDataUrl } : null))
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    try {
      await authClient.signOut()
    } catch {
    } finally {
      clearAccessToken()
      setUser(null)
      setProfileComplete(false)
      setIsProfileDrawerOpen(false)
    }
  }, [])

  const refreshMe = useCallback(async (): Promise<void> => {
    await loadProfile()
  }, [loadProfile])

  const isLoggedIn = user !== null && !isAuthLoading

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isAuthLoading,
        profileComplete,
        isProfileDrawerOpen,
        openProfileDrawer,
        closeProfileDrawer,
        sendEmailOtp,
        verifyEmailOtp,
        signInWithGoogle,
        completeProfile,
        updateProfile,
        updateAvatar,
        logout,
        refreshMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
