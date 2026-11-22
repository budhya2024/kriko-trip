import { cacheLife, cacheTag } from 'next/cache'
import { apiGet } from '../http'
import type { TravelTheme } from '../contracts'

export async function getTravelThemes(): Promise<TravelTheme[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('themes')

  try {
    return await apiGet<TravelTheme[]>('/api/v1/themes')
  } catch {
    return []
  }
}
