import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  // 現在のパス
  const pathname = request.nextUrl.pathname

  // ✅ /login ページにすでにいるのに、さらにリダイレクトしないようにする
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && !token.role && pathname !== '/select-role') {
    return NextResponse.redirect(new URL('/select-role', request.url))
  }

  if (token && pathname === '/login') {
    if (token.role === 'STUDENT') {
      return NextResponse.redirect(new URL('/dashboard/student', request.url))
    }
    if (token.role === 'LAB') {
      return NextResponse.redirect(new URL('/dashboard/lab', request.url))
    }
    if (token.role === 'COMPANY') {
      return NextResponse.redirect(new URL('/dashboard/company', request.url))
    }
  }

  return NextResponse.next()
}

// middlewareが適用されるパス
export const config = {
  matcher: ['/login', '/dashboard/:path*', '/select-role'],
}
