import type { paths } from './types.gen'

export type { paths }

export type SessionPrincipal =
  paths['/session']['get']['responses'][200]['content']['application/json']['data']

export type SessionResponse =
  paths['/session']['get']['responses'][200]['content']['application/json']

export type ApiErrorResponse =
  paths['/session']['get']['responses'][401]['content']['application/json']['error']

export type Destination =
  paths['/destinations']['get']['responses'][200]['content']['application/json']['data'][number]

export type TravelTheme =
  paths['/themes']['get']['responses'][200]['content']['application/json']['data'][number]

export type PackageListItem =
  paths['/packages']['get']['responses'][200]['content']['application/json']['data'][number]

export type PackageListResponse =
  paths['/packages']['get']['responses'][200]['content']['application/json']

export type PackageDetail =
  paths['/packages/{slug}']['get']['responses'][200]['content']['application/json']['data']

export type RelatedPackagesResponse =
  paths['/packages/{slug}/related']['get']['responses'][200]['content']['application/json']['data']

export type PackageSlugsResponse =
  paths['/packages/slugs']['get']['responses'][200]['content']['application/json']['data']

export type SiteSettings =
  paths['/site/settings']['get']['responses'][200]['content']['application/json']['data']

export type OfferItem =
  paths['/offers']['get']['responses'][200]['content']['application/json']['data'][number]

export type FaqItem =
  paths['/faqs']['get']['responses'][200]['content']['application/json']['data'][number]

export type FaqScope = 'general' | 'contact'
