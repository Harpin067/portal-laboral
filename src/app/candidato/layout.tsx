'use client';

/**
 * CandidatoLayout — Dashboard layout con Sidebar colapsable (desktop) y Sheet (móvil).
 * - Avatar del usuario en la parte inferior del sidebar
 * - Sidebar se puede colapsar a iconos solamente con animación suave
 * - Indicador de ruta activa con highlight de color primario
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Search,
  FileText,
  User,
  Menu,
  Briefcase,
  Bell,
  Star,
  MessageSquare,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/candidato/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/candidato/busqueda', label: 'Búsqueda', icon: Search },
  { href: '/candidato/solicitudes', label: 'Solicitudes', icon: FileText, badge: '3' },
  { href: '/candidato/alertas', label: 'Alertas', icon: Bell, badge: '2' },
  { href: '/candidato/valoraciones', label: 'Valoraciones', icon: Star },
  { href: '/candidato/comunidad', label: 'Comunidad', icon: MessageSquare },
  { href: '/candidato/recursos', label: 'Recursos', icon: BookOpen },
  { href: '/candidato/perfil', label: 'Mi Perfil', icon: User },
];

const mockUser = {
  name: 'Juan Pérez',
  email: 'juan@correo.com',
  initials: 'JP',
};

interface NavContentProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

function NavContent({ collapsed = false, onNavigate }: NavContentProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5 px-3 py-2 flex-1">
      {navLinks.map(({ href, label, icon: Icon, badge }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
              collapsed ? 'justify-center px-2' : '',
              isActive
                ? 'bg-[#1A56DB] text-white shadow-sm'
                : 'text-gray-600 hover:bg-[#1A56DB]/8 hover:text-[#1A56DB]'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 truncate">{label}</span>
                {badge && (
                  <Badge className="h-4 min-w-4 px-1 text-[10px] bg-[#10B981] text-white border-0 rounded-full">
                    {badge}
                  </Badge>
                )}
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default function CandidatoLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">

      {/* ── SIDEBAR DESKTOP ────────────────────────────────────────── */}
      <aside
        className={cn(
          'hidden lg:flex flex-col fixed inset-y-0 border-r border-gray-200 bg-white transition-all duration-300 ease-in-out z-20',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center border-b border-gray-100 h-16 px-4 shrink-0',
          collapsed ? 'justify-center' : 'justify-between'
        )}>
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-[#1A56DB]/10">
                <Briefcase className="h-4 w-4 text-[#1A56DB]" />
              </div>
              <span className="font-semibold text-[#111827] text-sm truncate">Portal Candidato</span>
            </Link>
          )}
          {collapsed && (
            <div className="p-1.5 rounded-lg bg-[#1A56DB]/10">
              <Briefcase className="h-4 w-4 text-[#1A56DB]" />
            </div>
          )}
          {/* Botón colapsar */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'p-1.5 rounded-lg text-gray-400 hover:text-[#1A56DB] hover:bg-[#1A56DB]/8 transition-colors shrink-0',
              collapsed ? 'hidden' : ''
            )}
            aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Botón expandir (solo visible cuando collapsed) */}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="mx-auto mt-2 p-1.5 rounded-lg text-gray-400 hover:text-[#1A56DB] hover:bg-[#1A56DB]/8 transition-colors"
            aria-label="Expandir sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

        {/* Nav */}
        <NavContent collapsed={collapsed} />

        <Separator className="mx-3" />

        {/* User profile */}
        <div className={cn(
          'flex items-center gap-3 px-4 py-4 shrink-0',
          collapsed ? 'justify-center px-2' : ''
        )}>
          <Avatar className="h-8 w-8 shrink-0 ring-2 ring-[#1A56DB]/20">
            <AvatarImage src="" alt={mockUser.name} />
            <AvatarFallback className="bg-[#1A56DB]/10 text-[#1A56DB] text-xs font-bold">
              {mockUser.initials}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#111827] truncate">{mockUser.name}</p>
              <p className="text-xs text-gray-400 truncate">{mockUser.email}</p>
            </div>
          )}
          {!collapsed && (
            <button className="p-1 text-gray-400 hover:text-red-500 transition-colors" aria-label="Cerrar sesión">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </aside>

      {/* ── MAIN CONTENT ───────────────────────────────────────────── */}
      <div className={cn(
        'flex flex-col flex-1 transition-all duration-300',
        collapsed ? 'lg:pl-16' : 'lg:pl-64'
      )}>

        {/* Topbar móvil */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200 sticky top-0 z-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#1A56DB]/10">
              <Briefcase className="h-4 w-4 text-[#1A56DB]" />
            </div>
            <span className="font-semibold text-[#111827] text-sm">Portal Candidato</span>
          </Link>
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7 ring-2 ring-[#1A56DB]/20">
              <AvatarFallback className="bg-[#1A56DB]/10 text-[#1A56DB] text-xs font-bold">
                {mockUser.initials}
              </AvatarFallback>
            </Avatar>
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Abrir menú" />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 flex flex-col">
                <div className="flex items-center gap-2 px-5 h-14 border-b border-gray-100 shrink-0">
                  <div className="p-1.5 rounded-lg bg-[#1A56DB]/10">
                    <Briefcase className="h-4 w-4 text-[#1A56DB]" />
                  </div>
                  <span className="font-semibold text-[#111827] text-sm">Portal Candidato</span>
                </div>
                <NavContent />
                <Separator className="mx-3" />
                <div className="flex items-center gap-3 px-4 py-4 shrink-0">
                  <Avatar className="h-8 w-8 ring-2 ring-[#1A56DB]/20">
                    <AvatarFallback className="bg-[#1A56DB]/10 text-[#1A56DB] text-xs font-bold">
                      {mockUser.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#111827] truncate">{mockUser.name}</p>
                    <p className="text-xs text-gray-400 truncate">{mockUser.email}</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
