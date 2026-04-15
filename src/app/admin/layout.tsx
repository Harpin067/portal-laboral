'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  ShieldCheck,
  LogOut,
  BarChart3,
  FileText,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const navLinks = [
  { href: '/admin/dashboard',  label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/admin/usuarios',   label: 'Usuarios',    icon: Users           },
  { href: '/admin/empresas',   label: 'Empresas',    icon: Building2       },
  { href: '/admin/vacantes',   label: 'Vacantes',    icon: Briefcase       },
  { href: '/admin/reportes',   label: 'Reportes',    icon: BarChart3       },
  { href: '/admin/contenido',  label: 'Contenido',   icon: FileText        },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 fixed inset-y-0 bg-[#0f172a] z-20">

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10 shrink-0">
          <div className="p-1.5 rounded-lg bg-[#1A56DB]/20">
            <ShieldCheck className="h-4 w-4 text-[#60a5fa]" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">IntegraJobs</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Admin · El Salvador</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/8 hover:text-white"
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <Separator className="mx-3 bg-white/10" />

        {/* Footer */}
        <div className="flex items-center gap-3 px-4 py-4 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#1A56DB]/20 flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 text-[#60a5fa]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">SuperAdmin</p>
            <p className="text-xs text-slate-400 truncate">admin@integrajobs.sv</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="p-1 text-slate-500 hover:text-red-400 transition-colors"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </aside>

      {/* ── Topbar (mobile + desktop header) ─────────────────────── */}
      <div className="flex flex-col flex-1 lg:pl-60">
        <header className="h-14 bg-[#0f172a] border-b border-white/10 flex items-center px-6 shrink-0">
          <div className="flex items-center gap-2 lg:hidden">
            <ShieldCheck className="h-4 w-4 text-[#60a5fa]" />
            <span className="text-sm font-bold text-white">IntegraJobs Admin</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-600">/</span>
            <span className="text-slate-300 font-medium">Panel de Control Global</span>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
