import { createAuthClient } from '@neon/auth/next'

export interface AuthTokenResponse {
  data?: {
    token: string
  } | null
  error?: unknown
}

export interface SendVerificationOtpInput {
  email: string
  type: 'sign-in' | 'change-email' | 'email-verification' | 'forget-password'
}

export interface SignInEmailOtpInput {
  email: string
  otp: string
}

export interface AuthSessionData {
  user: {
    id: string
    email: string
    name: string
    image?: string | null
  }
  session: {
    id: string
    userId: string
  }
}

export interface ClientNeonAuth {
  signIn: {
    email: (params: { email: string; password?: string }) => Promise<{
      data?: AuthSessionData | null
      error?: { message?: string } | null
    }>
    social: (params: {
      provider: 'google' | 'github'
      callbackURL?: string
    }) => Promise<void>
    emailOtp: (params: SignInEmailOtpInput) => Promise<{
      data?: AuthSessionData | null
      error?: { message?: string } | null
    }>
  }
  signOut: () => Promise<void>
  useSession: () => {
    data: AuthSessionData | null
    isPending: boolean
    error: unknown
  }
  token: () => Promise<AuthTokenResponse>
  emailOtp: {
    sendVerificationOtp: (params: SendVerificationOtpInput) => Promise<{
      data?: unknown
      error?: { message?: string } | null
    }>
  }
  updateUser: (params: { name?: string }) => Promise<{
    data?: unknown
    error?: { message?: string } | null
  }>
}

export const authClient = createAuthClient() as unknown as ClientNeonAuth

let cachedToken: string | null = null
let cachedExp = 0

function parseTokenExpiry(token: string): number {
  try {
    const parts = token.split('.')
    if (parts.length < 2) {
      return 0
    }
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const decoded = window.atob(base64)
    const json = JSON.parse(decoded) as { exp?: number }
    return typeof json.exp === 'number' ? json.exp * 1000 : 0
  } catch {
    return 0
  }
}

export async function getAccessToken(forceRefresh = false): Promise<string | null> {
  if (typeof window === 'undefined') {
    return null
  }

  const now = Date.now()
  if (!forceRefresh && cachedToken && cachedExp - now > 60_000) {
    return cachedToken
  }

  try {
    const res = await authClient.token()
    const token = res?.data?.token
    if (typeof token === 'string' && token.length > 0) {
      cachedToken = token
      cachedExp = parseTokenExpiry(token)
      return token
    }
    cachedToken = null
    cachedExp = 0
    return null
  } catch {
    cachedToken = null
    cachedExp = 0
    return null
  }
}

export function clearAccessToken(): void {
  cachedToken = null
  cachedExp = 0
}
