import { createNeonAuth } from '@neon/auth/next/server'
import { env } from '../env'

export const auth = createNeonAuth({
  baseUrl:
    env.NEON_AUTH_BASE_URL ||
    'https://ep-proud-band-bd4sb5ve.neonauth.c-8.us-east-2.aws.neon.tech/neondb/auth',
  cookies: {
    secret:
      env.NEON_AUTH_COOKIE_SECRET ||
      'zK1XZ0bPGtDa8epTwWUWZ4duUpwv0gCTm0OP+Ie1W4k=',
  },
})
