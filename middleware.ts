import { type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Only match /admin routes — public pages don't need auth middleware.
     * This avoids running on static files and public pages.
     */
    '/admin/:path*',
  ],
}
