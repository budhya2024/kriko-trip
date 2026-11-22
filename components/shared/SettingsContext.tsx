'use client'

import React, { createContext, useContext } from 'react'
import type { SiteSettings } from '@/lib/api/contracts'
import { DEFAULT_SITE_SETTINGS } from '@/lib/api/defaults'

export { DEFAULT_SITE_SETTINGS }

const SettingsContext = createContext<SiteSettings | null>(null)

export interface SettingsProviderProps {
  children: React.ReactNode
  settings: SiteSettings
}

export function SettingsProvider({ children, settings }: SettingsProviderProps) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSiteSettings(): SiteSettings {
  const context = useContext(SettingsContext)
  return context ?? DEFAULT_SITE_SETTINGS
}
