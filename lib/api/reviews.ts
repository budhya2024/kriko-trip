import { apiGet, apiGetEnvelope, apiSend } from './http'

export interface PublicReview {
  id: string
  packageId: string
  authorName: string
  authorLocation: string | null
  authorAvatarUrl: string | null
  tripType: 'couple' | 'family' | 'friends' | 'solo' | null
  title: string | null
  comment: string
  rating: number
  status?: 'pending' | 'approved' | 'hidden'
  helpfulCount: number
  verifiedBooking: boolean
  adminReply: string | null
  adminRepliedAt: string | null
  createdAt: string
  hasVotedHelpful?: boolean
}

export interface PackageReviewsSummary {
  reviewsCount: number
  ratingAvg: string
  ratingDistribution: Record<'1' | '2' | '3' | '4' | '5', number>
}

export interface PackageReviewsResponse {
  data: PublicReview[]
  summary: PackageReviewsSummary
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface SubmitReviewInput {
  rating: number
  comment: string
  title?: string | null
  tripType?: 'couple' | 'family' | 'friends' | 'solo' | null
  authorLocation?: string | null
}

export interface SubmitReviewResult {
  id?: string
  data?: PublicReview
  status: 'pending' | 'approved'
  message?: string
}

export interface ToggleHelpfulResult {
  helpful: boolean
  helpfulCount: number
}

export interface TestimonialItem {
  id: string
  packageId: string
  packageTitle: string
  packageSlug: string
  destinationName: string | null
  authorName: string
  authorLocation: string | null
  authorAvatarUrl: string | null
  tripType: string | null
  title: string | null
  comment: string
  rating: number
  createdAt: string
}

export async function fetchPackageReviews(
  slug: string,
  params?: { page?: number; limit?: number; rating?: number },
): Promise<PackageReviewsResponse> {
  const query = new URLSearchParams()
  if (params?.page) query.set('page', String(params.page))
  if (params?.limit) query.set('limit', String(params.limit))
  if (params?.rating) query.set('rating', String(params.rating))
  const qs = query.toString()
  const path = `/api/v1/packages/${encodeURIComponent(slug)}/reviews${qs ? `?${qs}` : ''}`
  return apiGetEnvelope<PublicReview[], PackageReviewsSummary>(path) as unknown as Promise<PackageReviewsResponse>
}

export async function submitReview(
  slug: string,
  input: SubmitReviewInput,
): Promise<SubmitReviewResult> {
  return apiSend<SubmitReviewResult>(
    `/api/v1/packages/${encodeURIComponent(slug)}/reviews`,
    'POST',
    input,
  )
}

export async function voteReviewHelpful(reviewId: string): Promise<ToggleHelpfulResult> {
  return apiSend<ToggleHelpfulResult>(
    `/api/v1/reviews/${encodeURIComponent(reviewId)}/helpful`,
    'POST',
  )
}

export async function fetchTestimonials(limit = 10): Promise<TestimonialItem[]> {
  return apiGet<TestimonialItem[]>(`/api/v1/testimonials?limit=${limit}`)
}
