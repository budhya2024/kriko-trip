import { cacheLife, cacheTag } from 'next/cache'
import { apiGet } from '../http'
import type { OfferItem } from '../contracts'

export async function getOffers(): Promise<OfferItem[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('offers')

  try {
    const data = await apiGet<OfferItem[]>('/api/v1/offers')
    if (Array.isArray(data)) {
      return data
    }
    return []
  } catch {
    return []
  }
}
