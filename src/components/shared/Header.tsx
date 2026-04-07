'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role as string | undefined;

  const dashboardHref = role ? `/${role}/dashboard` : '/';

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          IntegraJobs
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium">
          {session ? (
            <>
              <Link href={dashboardHref} className="hover:text-secondary transition-colors">
                Dashboard
              </Link>
              <span className="opacity-60">|</span>
              <span className="opacity-80">{session.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-danger hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-secondary transition-colors">
                Iniciar sesión
              </Link>
              <Link
                href="/registro/candidato"
                className="bg-secondary hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
