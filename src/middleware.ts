import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = [
  '/',
  '/login',
  '/registro',
  '/registro/candidato',
  '/registro/empresa',
  '/empleos',
  '/categorias',
  '/api/auth',
  '/api/candidato/busqueda',
  '/api/candidato/comunidad',
];
const candidatoRoutes = ['/candidato', '/api/candidato'];
const empresaRoutes = ['/empresa', '/api/empresa'];
const adminRoutes = ['/admin', '/api/admin'];

function matchesRoutes(pathname: string, routes: string[]): boolean {
  return routes.some((r) => pathname === r || pathname.startsWith(r + '/'));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Rutas públicas → permitir siempre
  if (matchesRoutes(pathname, publicRoutes)) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 2. Sin sesión → redirect a /login (sin (auth) prefix)
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Normalizar a minúsculas: el enum Prisma devuelve EMPRESA/CANDIDATO/SUPERADMIN
  const role = (token.role as string).toLowerCase();

  // 3. Admin → superusuario, permite todo
  if (role === 'superadmin') {
    return NextResponse.next();
  }

  // 4. Rutas de admin → no superadmin → redirect a su dashboard
  if (matchesRoutes(pathname, adminRoutes)) {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url));
  }

  // 5. Rutas de candidato → solo candidato
  if (matchesRoutes(pathname, candidatoRoutes) && role !== 'candidato') {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url));
  }

  // 6. Rutas de empresa → solo empresa
  if (matchesRoutes(pathname, empresaRoutes) && role !== 'empresa') {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
