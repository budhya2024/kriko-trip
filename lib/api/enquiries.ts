import { apiGet, apiSend } from './http'
import type { TripHistoryItem } from '@/components/shared/AuthContext'

export interface ValidateCouponInput {
  code: string
  packageSlug: string
  travellers: number
}

export interface ValidateCouponResult {
  code: string
  discountType: 'percent' | 'flat'
  discountPaise: number
  finalEstimatePaise: number
}

export interface SubmitEnquiryInput {
  packageSlug: string
  travellers: number
  travelDate?: string | null
  customerName: string
  customerEmail?: string | null
  phoneCountryCode?: string
  phone: string
  message?: string | null
  pagePath?: string | null
  couponCode?: string | null
  redeemLoyaltyPoints?: boolean
}

export interface SubmitEnquiryResult {
  id: string
  reference: string
  status: string
  unitPricePaise: number
  estimatePaise: number
  couponDiscountPaise: number
  loyaltyPointsReserved: number
  loyaltyDiscountPaise: number
  finalPricePaise: number
  message: string
}

export interface SubmitCallbackInput {
  customerName: string
  phoneCountryCode?: string
  phone: string
  pagePath?: string | null
  packageSlug?: string | null
  message?: string | null
}

export interface SubmitCallbackResult {
  id: string
  reference: string
  message: string
}

export async function validateCoupon(input: ValidateCouponInput): Promise<ValidateCouponResult> {
  return apiSend<ValidateCouponResult>('/api/v1/coupons/validate', 'POST', input)
}

export async function submitEnquiry(
  input: SubmitEnquiryInput,
  idempotencyKey?: string,
): Promise<SubmitEnquiryResult> {
  const headers: Record<string, string> = {}
  if (idempotencyKey) {
    headers['Idempotency-Key'] = idempotencyKey
  }
  return apiSend<SubmitEnquiryResult>('/api/v1/enquiries', 'POST', input, {
    headers,
  })
}

export async function submitCallbackRequest(
  input: SubmitCallbackInput,
): Promise<SubmitCallbackResult> {
  return apiSend<SubmitCallbackResult>('/api/v1/callback-requests', 'POST', input)
}

export async function fetchMyBookings(
  options: { page?: number; limit?: number } = {},
): Promise<TripHistoryItem[]> {
  const params = new URLSearchParams()
  if (options.page) params.set('page', String(options.page))
  if (options.limit) params.set('limit', String(options.limit))
  const qs = params.toString()
  return apiGet<TripHistoryItem[]>(`/api/v1/me/bookings${qs ? `?${qs}` : ''}`)
}

export async function fetchMyBookingDetail(reference: string): Promise<TripHistoryItem> {
  return apiGet<TripHistoryItem>(`/api/v1/me/bookings/${reference}`)
}
