import { cacheLife, cacheTag } from 'next/cache'
import { apiGet, apiGetEnvelope, apiGetRaw } from '../http'
import type {
  BlogCategory,
  BlogDetailResponse,
  BlogListItem,
} from '../contracts'

export async function getBlogCategories(): Promise<BlogCategory[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('blogs')

  try {
    const data = await apiGet<BlogCategory[]>('/api/v1/blogs/categories')
    if (Array.isArray(data)) {
      return data
    }
    return []
  } catch {
    return []
  }
}

export async function getBlogs(options?: {
  page?: number
  limit?: number
  category?: string
  destinationId?: string
  search?: string
}): Promise<{ items: BlogListItem[]; total: number; totalPages: number }> {
  'use cache'
  cacheLife('hours')
  cacheTag('blogs')

  const params = new URLSearchParams()
  if (options?.page) params.set('page', String(options.page))
  if (options?.limit) params.set('limit', String(options.limit))
  if (options?.category) params.set('category', options.category)
  if (options?.destinationId) params.set('destinationId', options.destinationId)
  if (options?.search) params.set('search', options.search)

  const queryString = params.toString()
  const path = queryString ? `/api/v1/blogs?${queryString}` : '/api/v1/blogs'

  try {
    const response = await apiGetEnvelope<BlogListItem[]>(path)
    return {
      items: response.data || [],
      total: response.meta?.total || 0,
      totalPages: response.meta?.totalPages || 1,
    }
  } catch {
    return {
      items: [],
      total: 0,
      totalPages: 1,
    }
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogDetailResponse | null> {
  'use cache'
  cacheLife('hours')
  cacheTag('blogs')
  cacheTag(`blog:${slug}`)

  try {
    const result = await apiGetRaw<BlogDetailResponse>(`/api/v1/blogs/${encodeURIComponent(slug)}`)
    if (result && result.data) {
      return result
    }
    return null
  } catch {
    return null
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('blogs')

  try {
    const res = await getBlogs({ limit: 100 })
    return res.items.map((item) => item.slug)
  } catch {
    return []
  }
}
