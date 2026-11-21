export interface ApiErrorPayload {
  code: string
  message: string
  details?: unknown
  requestId?: string
}

export class ApiError extends Error {
  readonly code: string
  readonly details?: unknown
  readonly requestId?: string
  readonly statusCode: number

  constructor(statusCode: number, payload: ApiErrorPayload) {
    super(payload.message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.code = payload.code
    this.details = payload.details
    this.requestId = payload.requestId
  }
}

export const toUserMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    switch (error.code) {
      case 'UNAUTHENTICATED':
        return 'Please sign in to continue.'
      case 'FORBIDDEN':
        return 'You do not have permission to view or modify this resource.'
      case 'NOT_FOUND':
        return 'The requested page or item could not be found.'
      case 'CONFLICT':
        return 'This action has already been performed or conflicts with existing data.'
      case 'RATE_LIMITED':
        return 'Too many requests. Please wait a moment and try again.'
      case 'VALIDATION_FAILED':
        return error.message || 'Please check the information you entered and try again.'
      case 'SERVICE_UNAVAILABLE':
        return 'The booking service is temporarily unavailable. Please try again shortly.'
      default:
        return error.message || 'Something went wrong. Please try again.'
    }
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred. Please try again.'
}
