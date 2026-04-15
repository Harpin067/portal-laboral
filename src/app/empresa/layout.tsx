'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navLinks = [
  { href: '/empresa/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/empresa/vacantes', label: 'Mis Vacantes', icon: Briefcase },
  { href: '/empresa/candidatos', label: 'Candidatos', icon: Users },
  { href: '/empresa/perfil', label: 'Mi Empresa', icon: Building2 },
];

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            onClick={onClick}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-[#1A56DB] text-white shadow-sm'
                : 'text-gray-600 hover:bg-[#1A56DB]/8 hover:text-[#1A56DB]'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </>
  );
}

export default function EmpresaLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* ── Sidebar desktop ──────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 fixed inset-y-0 bg-white border-r border-gray-200 z-20">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-gray-100 shrink-0">
          <div className="p-1.5 rounded-lg bg-[#1A56DB]/10">
            <Briefcase className="h-4 w-4 text-[#1A56DB]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#111827] leading-none">IntegraJobs</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Portal Empresa</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
          <NavLinks />
        </nav>

        <Separator className="mx-3" />

        {/* Footer */}
        <div className="flex items-center gap-3 px-4 py-4 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#1A56DB]/10 flex items-center justify-center">
            <span className="text-xs font-bold text-[#1A56DB]">E</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#111827] truncate">Mi Empresa</p>
            <p className="text-xs text-gray-400 truncate">empresa@demo.com</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </aside>

      {/* ── Mobile overlay ───────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile sidebar ───────────────────────────────────────── */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-40 flex flex-col transition-transform duration-200 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#1A56DB]/10">
              <Briefcase className="h-4 w-4 text-[#1A56DB]" />
            </div>
            <span className="text-sm font-bold text-[#111827]">IntegraJobs</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
          <NavLinks onClick={() => setMobileOpen(false)} />
        </nav>
      </aside>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 lg:pl-60">

        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#1A56DB]/10">
              <Briefcase className="h-4 w-4 text-[#1A56DB]" />
            </div>
            <span className="text-sm font-bold text-[#111827]">IntegraJobs</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </header>

        <main className="flex-1 p-5 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
