import { cacheLife, cacheTag } from 'next/cache'
import { apiGet, apiGetEnvelope, type PaginatedMeta } from '../http'
import type { PackageListItem, PackageDetail } from '../contracts'

export interface GetPackagesFilters {
  q?: string
  destination?: string
  theme?: string
  travelType?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  minDays?: number
  maxDays?: number
  featured?: boolean
  sort?: string
  page?: number
  limit?: number
}

export interface GetPackagesResult {
  data: PackageListItem[]
  meta: PaginatedMeta
}

export async function getPackages(
  filters: GetPackagesFilters = {}
): Promise<GetPackagesResult> {
  'use cache'
  cacheLife('minutes')
  cacheTag('packages')

  const queryParams = new URLSearchParams()
  if (filters.q) queryParams.set('q', filters.q)
  if (filters.destination && filters.destination !== 'All') {
    queryParams.set('destination', filters.destination)
  }
  if (filters.theme && filters.theme !== 'All') {
    queryParams.set('theme', filters.theme)
  }
  if (filters.travelType && filters.travelType !== 'All') {
    queryParams.set('travelType', filters.travelType.toLowerCase())
  }
  if (filters.category && filters.category !== 'All') {
    queryParams.set('category', filters.category.toLowerCase())
  }
  if (typeof filters.minPrice === 'number' && !isNaN(filters.minPrice)) {
    queryParams.set('minPrice', String(filters.minPrice))
  }
  if (typeof filters.maxPrice === 'number' && !isNaN(filters.maxPrice)) {
    queryParams.set('maxPrice', String(filters.maxPrice))
  }
  if (typeof filters.minDays === 'number' && !isNaN(filters.minDays)) {
    queryParams.set('minDays', String(filters.minDays))
  }
  if (typeof filters.maxDays === 'number' && !isNaN(filters.maxDays)) {
    queryParams.set('maxDays', String(filters.maxDays))
  }
  if (filters.featured !== undefined) {
    queryParams.set('featured', String(filters.featured))
  }
  if (filters.sort) {
    const sortVal =
      filters.sort === 'price-low'
        ? 'price_asc'
        : filters.sort === 'price-high'
          ? 'price_desc'
          : filters.sort === 'duration'
            ? 'duration_desc'
            : filters.sort === 'newest'
              ? 'newest'
              : 'popular'
    queryParams.set('sort', sortVal)
  }
  if (filters.page) queryParams.set('page', String(filters.page))
  if (filters.limit) queryParams.set('limit', String(filters.limit))

  const queryString = queryParams.toString()
  const path = queryString ? `/api/v1/packages?${queryString}` : '/api/v1/packages'

  try {
    const res = await apiGetEnvelope<PackageListItem[]>(path)
    return {
      data: res.data || [],
      meta: res.meta || {
        page: filters.page || 1,
        limit: filters.limit || 12,
        total: res.data ? res.data.length : 0,
        totalPages: 1,
      },
    }
  } catch {
    return {
      data: [],
      meta: {
        page: filters.page || 1,
        limit: filters.limit || 12,
        total: 0,
        totalPages: 0,
      },
    }
  }
}

export async function getPackage(slug: string): Promise<PackageDetail | null> {
  'use cache'
  cacheLife('hours')
  cacheTag('packages', `package:${slug}`)

  try {
    return await apiGet<PackageDetail>(`/api/v1/packages/${encodeURIComponent(slug)}`)
  } catch {
    return null
  }
}

export async function getRelatedPackages(slug: string): Promise<PackageListItem[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('packages', `package:${slug}`)

  try {
    return await apiGet<PackageListItem[]>(
      `/api/v1/packages/${encodeURIComponent(slug)}/related`
    )
  } catch {
    return []
  }
}

export async function getPackageSlugs(): Promise<string[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('packages')

  try {
    return await apiGet<string[]>('/api/v1/packages/slugs')
  } catch {
    return []
  }
}

export async function getFeaturedPackages(): Promise<PackageListItem[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('packages')

  try {
    return await apiGet<PackageListItem[]>('/api/v1/packages?featured=true&limit=6')
  } catch {
    return []
  }
}
