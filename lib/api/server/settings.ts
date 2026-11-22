import { cacheLife, cacheTag } from 'next/cache'
import { apiGet } from '../http'
import type { SiteSettings } from '../contracts'
import { DEFAULT_SITE_SETTINGS } from '../defaults'

export async function getSettings(): Promise<SiteSettings> {
  'use cache'
  cacheLife('hours')
  cacheTag('settings')

  try {
    const data = await apiGet<SiteSettings>('/api/v1/site/settings')
    if (data) {
      return data
    }
  } catch {
    return DEFAULT_SITE_SETTINGS
  }

  return DEFAULT_SITE_SETTINGS
}
