import { cacheLife, cacheTag } from 'next/cache'
import { apiGet } from '../http'
import type { Destination } from '../contracts'

export async function getFeaturedDestinations(): Promise<Destination[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('destinations')

  try {
    return await apiGet<Destination[]>('/api/v1/destinations?featured=true')
  } catch {
    return []
  }
}

export async function getAllDestinations(): Promise<Destination[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('destinations')

  try {
    return await apiGet<Destination[]>('/api/v1/destinations')
  } catch {
    return []
  }
}
