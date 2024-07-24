import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':')

// TODO: setup cookie-token-based auth
export function middleware(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return new NextResponse('Smegoal does not like guests.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    })
  }

  return NextResponse.next()
}

const isAuthenticated = (req: NextRequest) => {
  if (!AUTH_USER || AUTH_PASS?.length < 10) {
    console.error('Auth: incorrect env config.')
    return false
  }

  const authheader =
    req.headers.get('authorization') || req.headers.get('Authorization')

  if (!authheader) {
    console.log('Auth: Missing header.')
    return false
  }

  const [user, pass] = Buffer.from(authheader.split(' ')[1], 'base64')
    .toString()
    .split(':')

  const credentialsCorrect = user == AUTH_USER && pass == AUTH_PASS

  return credentialsCorrect
}
