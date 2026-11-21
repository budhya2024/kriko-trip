import type { paths } from './types.gen'

export type { paths }

export type SessionPrincipal =
  paths['/session']['get']['responses'][200]['content']['application/json']['data']

export type SessionResponse =
  paths['/session']['get']['responses'][200]['content']['application/json']

export type ApiErrorResponse =
  paths['/session']['get']['responses'][401]['content']['application/json']['error']
