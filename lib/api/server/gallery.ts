import { cacheLife, cacheTag } from 'next/cache'
import { apiGet } from '../http'
import type { GalleryCategory, GalleryItem } from '../contracts'

export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('gallery')

  try {
    const data = await apiGet<GalleryCategory[]>('/api/v1/gallery/categories')
    if (Array.isArray(data)) {
      return data
    }
    return []
  } catch {
    return []
  }
}

export async function getGalleryItems(options?: {
  category?: string
  page?: number
  limit?: number
}): Promise<GalleryItem[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('gallery')

  const params = new URLSearchParams()
  if (options?.category) params.set('category', options.category)
  if (options?.page) params.set('page', String(options.page))
  if (options?.limit) params.set('limit', String(options.limit))

  const queryString = params.toString()
  const path = queryString ? `/api/v1/gallery?${queryString}` : '/api/v1/gallery'

  try {
    const data = await apiGet<GalleryItem[]>(path)
    if (Array.isArray(data)) {
      return data
    }
    return []
  } catch {
    return []
  }
}
