import { apiGet, apiSend } from './http'

export interface CustomerLoyalty {
  pointsBalance: number
  pointsLifetime: number
  tier: 'silver_explorer' | 'gold_explorer' | 'platinum_elite'
}

export interface CustomerProfileData {
  id: string
  name: string
  email: string
  emailVerified: boolean
  avatarUrl: string | null
  phoneCountryCode: string | null
  phone: string | null
  location: string | null
  bio: string | null
  marketingOptIn: boolean
  loyalty: CustomerLoyalty
  profileComplete: boolean
  profileCompletedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface UpdateCustomerProfilePayload {
  name?: string
  phoneCountryCode?: string | null
  phone?: string | null
  location?: string | null
  bio?: string | null
  marketingOptIn?: boolean
}

export async function fetchMyProfile(): Promise<CustomerProfileData> {
  return apiGet<CustomerProfileData>('/api/v1/me')
}

export async function updateMyProfile(
  payload: UpdateCustomerProfilePayload,
): Promise<CustomerProfileData> {
  return apiSend<CustomerProfileData>('/api/v1/me', 'PATCH', payload)
}
