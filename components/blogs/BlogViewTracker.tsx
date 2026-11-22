'use client'

import { useEffect, useRef } from 'react'
import type { BlogViewPingResponse } from '@/lib/api/contracts'
import { apiSend } from '@/lib/api/http'

interface BlogViewTrackerProps {
  slug: string
}

export default function BlogViewTracker({ slug }: BlogViewTrackerProps) {
  const recordedRef = useRef(false)

  useEffect(() => {
    if (recordedRef.current) return
    recordedRef.current = true
    apiSend<BlogViewPingResponse>(`/api/v1/blogs/${encodeURIComponent(slug)}/views`, 'POST').catch(() => null)
  }, [slug])

  return null
}
