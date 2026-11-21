import { env } from '../env'
import { clearAccessToken, getAccessToken } from '../auth/client'
import { ApiError } from './errors'

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return env.NEXT_PUBLIC_API_URL
  }
  return env.API_URL || env.NEXT_PUBLIC_API_URL
}

interface Envelope<T> {
  data: T
  meta?: unknown
}

const parseResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as unknown as T
  }

  const contentType = response.headers.get('content-type')
  const isJson = contentType && contentType.includes('application/json')
  const body = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    if (isJson && body && typeof body === 'object' && 'error' in body) {
      const errorObj = (
        body as {
          error?: {
            code?: string
            message?: string
            details?: unknown
            requestId?: string
          }
        }
      ).error
      throw new ApiError(response.status, {
        code: errorObj?.code ?? 'UNKNOWN_ERROR',
        message: errorObj?.message ?? response.statusText,
        details: errorObj?.details,
        requestId: errorObj?.requestId,
      })
    }
    throw new ApiError(response.status, {
      code: 'HTTP_ERROR',
      message: typeof body === 'string' && body.length > 0 ? body : response.statusText,
    })
  }

  if (isJson && body && typeof body === 'object' && 'data' in body) {
    return (body as Envelope<T>).data
  }

  return body as T
}

export const apiGet = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const baseUrl = getBaseUrl()
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const targetUrl = `${baseUrl}${cleanPath}`

  const headers = new Headers(options?.headers)
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }

  if (typeof window !== 'undefined' && !headers.has('Authorization')) {
    const token = await getAccessToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  let response = await fetch(targetUrl, {
    ...options,
    method: 'GET',
    headers,
    signal: options?.signal ?? AbortSignal.timeout(15_000),
  })

  if (response.status === 401 && typeof window !== 'undefined') {
    const freshToken = await getAccessToken(true)
    if (freshToken) {
      headers.set('Authorization', `Bearer ${freshToken}`)
      response = await fetch(targetUrl, {
        ...options,
        method: 'GET',
        headers,
        signal: options?.signal ?? AbortSignal.timeout(15_000),
      })
    } else {
      clearAccessToken()
    }
  }

  return parseResponse<T>(response)
}

export const apiSend = async <T>(
  path: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  body?: unknown,
  options?: RequestInit,
): Promise<T> => {
  const baseUrl = getBaseUrl()
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const targetUrl = `${baseUrl}${cleanPath}`

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData
  const headers = new Headers(options?.headers)
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }
  if (!isFormData && body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (typeof window !== 'undefined' && !headers.has('Authorization')) {
    const token = await getAccessToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  let response = await fetch(targetUrl, {
    ...options,
    method,
    headers,
    body: isFormData ? (body as FormData) : body !== undefined ? JSON.stringify(body) : undefined,
    signal: options?.signal ?? AbortSignal.timeout(15_000),
  })

  if (response.status === 401 && typeof window !== 'undefined') {
    const freshToken = await getAccessToken(true)
    if (freshToken) {
      headers.set('Authorization', `Bearer ${freshToken}`)
      response = await fetch(targetUrl, {
        ...options,
        method,
        headers,
        body: isFormData
          ? (body as FormData)
          : body !== undefined
            ? JSON.stringify(body)
            : undefined,
        signal: options?.signal ?? AbortSignal.timeout(15_000),
      })
    } else {
      clearAccessToken()
    }
  }

  return parseResponse<T>(response)
}
