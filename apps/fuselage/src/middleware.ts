import { NextResponse, type NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'
import { i18nCookieName } from '@/constants'
import { languages, fallbackLng } from '@/domains/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl

  if (url.pathname.indexOf('icon') > -1 || url.pathname.indexOf('chrome') > -1) {
    return NextResponse.next()
  }

  const possibilities = [acceptLanguage.get(req.headers.get('Accept-Language'))]
  if (req.cookies.has(i18nCookieName)) {
    possibilities.push(acceptLanguage.get(req.cookies.get(i18nCookieName)?.value))
  }

  if (url.searchParams.has('lng')) {
    possibilities.push(acceptLanguage.get(url.searchParams.get('lng')))
  }

  const lang = possibilities.reverse().find((it) => it) || fallbackLng
  const response = NextResponse.next()

  if (req.cookies.get(i18nCookieName)?.value !== lang) {
    response.cookies.set(i18nCookieName, lang)
  }

  return response
}
