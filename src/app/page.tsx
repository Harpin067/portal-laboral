import Link from 'next/link';
import {
  Briefcase,
  Search,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Building2,
  MapPin,
  Code2,
  Palette,
  BarChart3,
  Settings,
  HeartPulse,
  BookOpen,
  ShoppingBag,
  Megaphone,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import HeroSearch from '@/components/shared/HeroSearch';
import JobCard from '@/components/shared/JobCard';
import { getActiveVacancies, toJobCard } from '@/lib/vacancy-helpers';

/* ─── DATA ────────────────────────────────────────────────────────── */
const stats = [
  { value: '+10k', label: 'Vacantes activas', sub: 'actualizadas diario' },
  { value: '+500', label: 'Empresas', sub: 'verificadas' },
  { value: '95%', label: 'Tasa de éxito', sub: 'de colocación' },
  { value: '48h', label: 'Tiempo medio', sub: 'primera respuesta' },
];

const categorias = [
  { icon: Code2, label: 'Tecnología', count: '1,240', color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100', slug: 'tecnologia' },
  { icon: Palette, label: 'Diseño', count: '380', color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100', slug: 'diseno' },
  { icon: BarChart3, label: 'Finanzas', count: '620', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100', slug: 'finanzas' },
  { icon: Settings, label: 'Ingeniería', count: '520', color: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100', slug: 'ingenieria' },
  { icon: HeartPulse, label: 'Salud', count: '290', color: 'bg-red-50 text-red-600 group-hover:bg-red-100', slug: 'salud' },
  { icon: BookOpen, label: 'Educación', count: '180', color: 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100', slug: 'educacion' },
  { icon: ShoppingBag, label: 'Retail', count: '340', color: 'bg-pink-50 text-pink-600 group-hover:bg-pink-100', slug: 'retail' },
  { icon: Megaphone, label: 'Marketing', count: '410', color: 'bg-teal-50 text-teal-600 group-hover:bg-teal-100', slug: 'marketing' },
];

const beneficiosCandidatos = [
  { icon: Search, title: 'Búsqueda inteligente', desc: 'Filtra por modalidad, sector y salario en segundos.' },
  { icon: Zap, title: 'Aplicación express', desc: 'Postula a múltiples empleos con un solo perfil.' },
  { icon: Star, title: 'Alertas personalizadas', desc: 'Recibe notificaciones de tu empleo ideal.' },
];

const beneficiosEmpresas = [
  { icon: Users, title: 'Talento verificado', desc: 'Base de candidatos activos con perfiles completos.' },
  { icon: TrendingUp, title: 'ATS integrado', desc: 'Gestiona postulaciones y fases del proceso.' },
  { icon: Shield, title: 'Marca empleadora', desc: 'Destaca con perfil corporativo y estadísticas.' },
];

const footerLinks = [
  {
    title: 'Candidatos',
    links: [
      { label: 'Buscar empleo', href: '/empleos' },
      { label: 'Mi perfil', href: '/login' },
      { label: 'Alertas de empleo', href: '/login' },
      { label: 'Subir CV', href: '/login' },
    ],
  },
  {
    title: 'Empresas',
    links: [
      { label: 'Publicar vacante', href: '/login?type=empresa' },
      { label: 'Dashboard', href: '/login?type=empresa' },
      { label: 'Postulaciones', href: '/login?type=empresa' },
      { label: 'Planes', href: '/login?type=empresa' },
    ],
  },
  {
    title: 'Plataforma',
    links: [
      { label: 'Iniciar sesión', href: '/login' },
      { label: 'Registro candidato', href: '/registro/candidato' },
      { label: 'Registro empresa', href: '/registro/empresa' },
      { label: 'Soporte', href: '/empleos' },
    ],
  },
];

const socialLinks = [
  {
    label: 'Twitter / X',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.262 5.634 5.902-5.634Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

/* ─── PAGE ────────────────────────────────────────────────────────── */
export default async function LandingPage() {
  const rawVacancies = await getActiveVacancies(3);
  const featuredJobs = rawVacancies.map(toJobCard);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f2d6b] via-[#1A56DB] to-[#1e6fb8] text-white min-h-[88vh] flex items-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[#10B981]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-2xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-6 py-28 md:py-36">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/15 text-xs font-medium px-3.5 py-1.5 tracking-wide backdrop-blur-sm">
              N.° 1 Portal de Empleo en El Salvador
            </Badge>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.07] tracking-tight mb-6">
              Tu carrera{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#10B981] via-emerald-300 to-[#10B981] bg-clip-text text-transparent">
                  empieza aquí
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 rounded-full" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 max-w-xl mx-auto mb-10 leading-relaxed">
              Miles de empleos. Cientos de empresas verificadas. Una plataforma diseñada para impulsar tu próximo gran paso.
            </p>

            {/* Client search component — redirects to /empleos?q=... */}
            <HeroSearch />

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link href="/empleos">
                <Button size="lg" className="bg-white text-[#1A56DB] hover:bg-slate-50 font-semibold h-12 px-8 gap-2 shadow-lg shadow-blue-900/20">
                  <Search className="h-4 w-4" /> Explorar empleos
                </Button>
              </Link>
              <Link href="/login?type=empresa">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold h-12 px-8 gap-2">
                  <Briefcase className="h-4 w-4" /> Publicar vacante
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-14 block">
            <path d="M0 56 C360 0 1080 0 1440 56 L1440 56 L0 56Z" fill="rgb(248 250 252)" />
          </svg>
        </div>
      </section>

      {/* ── STATS BANNER ──────────────────────────────────────────── */}
      <section className="bg-slate-50 relative z-10 -mt-1">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/60 p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              >
                <p className="text-3xl md:text-4xl font-black text-[#1A56DB] tracking-tight">{s.value}</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">{s.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES — 2 BIG CARDS ───────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Card A — Candidatos → /registro/candidato */}
          <Link href="/registro/candidato">
            <Card className="group relative overflow-hidden border-0 shadow-xl shadow-emerald-100/60 bg-gradient-to-br from-emerald-500 to-[#059669] text-white rounded-3xl hover:shadow-2xl hover:shadow-emerald-200/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl pointer-events-none" />
              <CardContent className="relative p-8 md:p-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                  <Search className="h-7 w-7 text-white" />
                </div>
                <Badge className="mb-4 bg-white/20 text-white border-white/20 text-xs font-medium">Para candidatos</Badge>
                <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3">
                  Encuentra tu<br />próximo reto
                </h2>
                <p className="text-emerald-100 text-sm leading-relaxed mb-8 max-w-xs">
                  Accede a miles de empleos verificados y herramientas para acelerar tu búsqueda laboral.
                </p>
                <ul className="space-y-3 mb-8">
                  {beneficiosCandidatos.map(({ title }) => (
                    <li key={title} className="flex items-center gap-2 text-sm text-emerald-100">
                      <CheckCircle className="h-4 w-4 text-white shrink-0" />
                      {title}
                    </li>
                  ))}
                </ul>
                <Button className="bg-white text-[#059669] hover:bg-emerald-50 font-semibold gap-2 rounded-xl h-11 px-6 shadow-lg">
                  Crear cuenta gratis <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Card B — Empresas → /login?type=empresa */}
          <Link href="/login?type=empresa">
            <Card className="group relative overflow-hidden border-0 shadow-xl shadow-blue-100/60 bg-gradient-to-br from-[#1A56DB] to-[#0f2d6b] text-white rounded-3xl hover:shadow-2xl hover:shadow-blue-200/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl pointer-events-none" />
              <CardContent className="relative p-8 md:p-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <Badge className="mb-4 bg-white/20 text-white border-white/20 text-xs font-medium">Para empresas</Badge>
                <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3">
                  Publica y gestiona<br />talento
                </h2>
                <p className="text-blue-200 text-sm leading-relaxed mb-8 max-w-xs">
                  Herramientas de reclutamiento profesionales para equipos de todos los tamaños.
                </p>
                <ul className="space-y-3 mb-8">
                  {beneficiosEmpresas.map(({ title }) => (
                    <li key={title} className="flex items-center gap-2 text-sm text-blue-200">
                      <CheckCircle className="h-4 w-4 text-white shrink-0" />
                      {title}
                    </li>
                  ))}
                </ul>
                <Button className="bg-white text-[#1A56DB] hover:bg-blue-50 font-semibold gap-2 rounded-xl h-11 px-6 shadow-lg">
                  Registrar empresa <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* ── EMPLEOS DESTACADOS ────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-[#10B981] uppercase tracking-widest mb-1">Oportunidades</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Empleos destacados</h2>
            </div>
            {/* "Ver todos" → /empleos */}
            <Link href="/empleos">
              <Button variant="ghost" size="sm" className="text-[#1A56DB] gap-1 hover:text-[#1A56DB]/80 font-medium cursor-pointer">
                Ver todos <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          {/* Each card → /empleos/[id] (via JobCard) */}
          <div className="grid sm:grid-cols-3 gap-4">
            {featuredJobs.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-[#1A56DB] uppercase tracking-widest mb-1">Explorar</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Categorías populares</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categorias.map(({ icon: Icon, label, count, color, slug }) => (
            <Link key={label} href={`/categorias/${slug}`}>
              <div className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-100 bg-white hover:border-[#1A56DB]/30 hover:shadow-sm transition-all duration-200 cursor-pointer text-center">
                <div className={`p-3 rounded-xl ${color} transition-colors duration-200`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{count} empleos</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-[#0f2d6b] to-[#1A56DB] text-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#10B981] uppercase tracking-widest mb-3">Empieza hoy</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
            ¿Listo para dar<br className="hidden sm:block" /> el siguiente paso?
          </h2>
          <p className="text-slate-300 text-sm mb-10 max-w-md mx-auto leading-relaxed">
            Únete a miles de profesionales y empresas que ya confían en nuestra plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/empleos">
              <Button size="lg" className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold h-12 px-8 gap-2 rounded-xl shadow-lg shadow-emerald-900/30">
                <Search className="h-4 w-4" /> Explorar empleos
              </Button>
            </Link>
            <Link href="/login?type=empresa">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold h-12 px-8 gap-2 rounded-xl">
                <Briefcase className="h-4 w-4" /> Publicar vacante
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
            {['Registro gratuito', 'Sin tarjeta de crédito', 'Soporte en español'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-[#10B981]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 text-slate-400">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#1A56DB] flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-white text-sm tracking-tight">
                  IntegraJobs
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                La plataforma líder en conexión de talento y oportunidades laborales en El Salvador.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ svg, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#1A56DB] text-slate-400 hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                  >
                    {svg}
                  </a>
                ))}
              </div>
            </div>

            {footerLinks.map(({ title, links }) => (
              <div key={title}>
                <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">{title}</p>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className="text-sm hover:text-white transition-colors duration-150">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="bg-slate-800 mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <span>© 2026 IntegraJobs. Todos los derechos reservados.</span>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-slate-400 transition-colors">Privacidad</Link>
              <Link href="/" className="hover:text-slate-400 transition-colors">Términos</Link>
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" /> Hecho con ❤️ en El Salvador
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
