import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowLeft,
  Building2,
  Wifi,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MOCK_JOBS, CATEGORIAS_META } from '@/lib/mock-jobs';

export function generateStaticParams() {
  return MOCK_JOBS.map((j) => ({ id: j.id }));
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = MOCK_JOBS.find((j) => j.id === params.id);
  if (!job) notFound();

  const catMeta = CATEGORIAS_META[job.categoriaSlug];
  const modalidadColor =
    job.modalidad === 'Remoto'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : job.modalidad === 'Híbrido'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-slate-50 text-slate-600 border-slate-200';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back bar */}
      <div className="bg-white border-b border-slate-100 px-6 py-3">
        <div className="max-w-4xl mx-auto">
          <Link href="/empleos">
            <Button variant="ghost" size="sm" className="gap-1.5 text-slate-500 hover:text-[#1A56DB] -ml-2 cursor-pointer">
              <ArrowLeft className="h-4 w-4" /> Volver a empleos
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job header card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#1A56DB]/10 flex items-center justify-center font-black text-[#1A56DB] text-xl shrink-0">
                {job.logo}
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">{job.titulo}</h1>
                <p className="text-sm text-slate-500 mt-0.5 font-medium">{job.empresa}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <MapPin className="h-3.5 w-3.5" /> {job.ubicacion}
              </span>
              <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium ${modalidadColor}`}>
                <Wifi className="h-3.5 w-3.5" /> {job.modalidad}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <DollarSign className="h-3.5 w-3.5" /> {job.salario}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Clock className="h-3.5 w-3.5" /> {job.publicado}
              </span>
              {catMeta && (
                <Badge className={`text-xs border ${catMeta.color}`}>{catMeta.label}</Badge>
              )}
            </div>

            {/* CTA — redirects to /login */}
            <Link href="/login">
              <Button className="w-full sm:w-auto bg-[#1A56DB] hover:bg-[#1440a8] text-white font-semibold h-11 px-8 gap-2 rounded-xl shadow-md shadow-blue-200">
                <Briefcase className="h-4 w-4" /> Postularme a esta vacante
              </Button>
            </Link>
            <p className="text-xs text-slate-400 mt-2">Necesitas una cuenta para postular. Es gratis.</p>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3">Sobre el puesto</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{job.descripcion}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3">Responsabilidades</h2>
              <ul className="space-y-2">
                {job.responsabilidades.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3">Requisitos</h2>
              <ul className="space-y-2">
                {job.requisitos.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-[#1A56DB] shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3">Beneficios</h2>
              <ul className="space-y-2">
                {job.beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0 mt-2" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Apply CTA sticky */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3 sticky top-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A56DB]/10 flex items-center justify-center font-bold text-[#1A56DB]">
                {job.logo}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{job.empresa}</p>
                <p className="text-xs text-slate-400">Empresa verificada</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Modalidad</span>
                <span className="font-medium">{job.modalidad}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ubicación</span>
                <span className="font-medium">{job.ubicacion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Salario</span>
                <span className="font-medium">{job.salario}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Área</span>
                <span className="font-medium">{job.categoria}</span>
              </div>
            </div>
            <Separator />
            <Link href="/login" className="block">
              <Button className="w-full bg-[#1A56DB] hover:bg-[#1440a8] text-white font-semibold h-10 gap-2 rounded-xl">
                <Briefcase className="h-4 w-4" /> Postularme
              </Button>
            </Link>
            <Link href="/registro" className="block">
              <Button variant="outline" className="w-full h-9 text-xs border-slate-200 hover:border-[#1A56DB]/30 hover:text-[#1A56DB] cursor-pointer">
                Crear cuenta gratis
              </Button>
            </Link>
          </div>

          {/* Similar jobs */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Empleos similares</p>
            <div className="space-y-3">
              {MOCK_JOBS.filter((j) => j.id !== job.id && j.categoriaSlug === job.categoriaSlug).slice(0, 3).map((j) => (
                <Link key={j.id} href={`/empleos/${j.id}`} className="flex items-center gap-2.5 group">
                  <div className="w-8 h-8 rounded-lg bg-[#1A56DB]/10 flex items-center justify-center text-xs font-bold text-[#1A56DB] shrink-0">
                    {j.logo}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-800 group-hover:text-[#1A56DB] transition-colors truncate">{j.titulo}</p>
                    <p className="text-xs text-slate-400">{j.empresa}</p>
                  </div>
                </Link>
              ))}
              {MOCK_JOBS.filter((j) => j.id !== job.id && j.categoriaSlug === job.categoriaSlug).length === 0 && (
                <p className="text-xs text-slate-400">No hay empleos similares por ahora.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
