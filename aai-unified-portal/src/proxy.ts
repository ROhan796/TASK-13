import { NextResponse, NextRequest } from 'next/server'

const isDevMode = process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes('placeholder')

async function clerkAuthMiddleware(request: NextRequest) {
  const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server')

  const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks/clerk(.*)',
    '/api/auth/redirect(.*)',
    '/unauthorized(.*)'
  ])

  const isAdminRoute = createRouteMatcher(['/admin(.*)'])
  const isTerminalRoute = createRouteMatcher(['/terminal(.*)'])
  const isAuditRoute = createRouteMatcher(['/audit(.*)'])

  const handler = clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth()
    let currentRole = (sessionClaims?.metadata as { role?: string })?.role

    if (isPublicRoute(req)) {
      return NextResponse.next()
    }

    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    if (!currentRole) {
      try {
        const { db } = await import('./db/client')
        const { appUsers } = await import('./db/schema')
        const { eq } = await import('drizzle-orm')
        const [dbUser] = await db.select({ role: appUsers.role })
          .from(appUsers)
          .where(eq(appUsers.clerkId, userId))
          .limit(1)
        if (dbUser) {
          currentRole = dbUser.role
        }
      } catch (e) {
        console.error('Failed to resolve role from database in proxy middleware:', e)
      }
    }

    if (isAdminRoute(req) && currentRole !== 'ADMIN') {
      return NextResponse.redirect(
        new URL(`/unauthorized?required=ADMIN&current=${currentRole || 'NONE'}`, req.url)
      )
    }

    if (isTerminalRoute(req) && currentRole !== 'TERMINAL') {
      return NextResponse.redirect(
        new URL(`/unauthorized?required=TERMINAL&current=${currentRole || 'NONE'}`, req.url)
      )
    }

    if (isAuditRoute(req) && currentRole !== 'AUDITOR') {
      return NextResponse.redirect(
        new URL(`/unauthorized?required=AUDITOR&current=${currentRole || 'NONE'}`, req.url)
      )
    }

    return NextResponse.next()
  })

  return handler(request, {} as any)
}

export default async function middleware(request: NextRequest) {
  if (isDevMode) {
    return NextResponse.next()
  }
  return clerkAuthMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
