'use client';

import Link from 'next/link';
import { Briefcase, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Empleos', href: '/empleos' },
  { label: 'Empresas', href: '/login?type=empresa' },
  { label: 'Candidatos', href: '/registro/candidato' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const role = (session?.user as any)?.role as string | undefined;

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-3">
      <nav className="w-full max-w-6xl backdrop-blur-md bg-white/75 border border-white/40 shadow-lg shadow-slate-200/40 rounded-2xl px-5 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#1A56DB] flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-[#111827] text-sm tracking-tight hidden sm:block">
            IntegraJobs
          </span>
        </Link>

        {/* Center links — desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-[#1A56DB] hover:bg-blue-50 transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right — auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          {session ? (
            <>
              <Link href={role ? `/${role}/dashboard` : '/'}>
                <Button variant="ghost" size="sm" className="text-sm font-medium text-slate-600 hover:text-[#1A56DB]">
                  Dashboard
                </Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                className="text-sm border-slate-200 text-slate-600 hover:border-[#1A56DB] hover:text-[#1A56DB]"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Salir
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-sm font-medium text-slate-600 hover:text-[#1A56DB]">
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/registro">
                <Button size="sm" className="text-sm bg-[#1A56DB] hover:bg-[#1440a8] text-white rounded-lg px-4">
                  Registrarse
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="absolute top-[68px] inset-x-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-4 flex flex-col gap-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#1A56DB] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-slate-100 mt-1 pt-3 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="w-full border-slate-200 text-slate-700">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/registro" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full bg-[#1A56DB] hover:bg-[#1440a8] text-white">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
