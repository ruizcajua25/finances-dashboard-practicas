import { NextResponse, NextRequest } from 'next/server'
import {jwtVerify} from 'jose'
 
export async function proxy(request: NextRequest) {
  if(request.nextUrl.pathname.includes('/login')) {
    return NextResponse.next()
  }

  const token = request.cookies.get('token')
  if(!token) return NextResponse.redirect(new URL('/login', request.url))

  try { 
    const secret = new TextEncoder().encode(process.env.DB_SECRET)
    const { payload } = await jwtVerify(token.value, secret)
  }
  catch (error) {
    console.error(error)
    return NextResponse.redirect(new URL('/login', request.url))
  }

 return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Coincidir con todas las rutas de solicitud excepto las que comienzan con:
     * - api (rutas API)
     * - _next/static (archivos estáticos)
     * - _next/image (archivos de optimización de imágenes)
     * - favicon.ico (archivo favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}