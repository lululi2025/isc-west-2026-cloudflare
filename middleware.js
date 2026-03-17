export const config = {
  matcher: '/(.*)',
}

export default function middleware(request) {
  const auth = request.headers.get('authorization')

  if (auth) {
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded)
      const colonIndex = decoded.indexOf(':')
      const password = decoded.slice(colonIndex + 1)

      if (password === process.env.SITE_PASSWORD) {
        return // pass through to static file
      }
    }
  }

  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="ISC West 2026"',
    },
  })
}
