import { cacheLife, cacheTag } from 'next/cache'
import { apiGet } from '../http'
import type { FaqItem, FaqScope } from '../contracts'

export async function getFaqs(scope: FaqScope = 'general'): Promise<FaqItem[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('faqs')

  try {
    const data = await apiGet<FaqItem[]>(`/api/v1/faqs?scope=${scope}`)
    if (Array.isArray(data) && data.length > 0) {
      return data
    }

    if (scope === 'contact') {
      const fallback = await apiGet<FaqItem[]>('/api/v1/faqs?scope=general')
      if (Array.isArray(fallback)) {
        return fallback
      }
    }

    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}
