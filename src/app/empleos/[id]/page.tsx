import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin, Briefcase, DollarSign, Clock, CheckCircle,
  ArrowLeft, Building2, Wifi, User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getVacancyById, getActiveVacancies, toJobCard } from '@/lib/vacancy-helpers';
import { formatSalario, modalidadLabel, contratoLabel, experienciaLabel, timeAgo } from '@/lib/helpers';
import { PostularButton } from './PostularButton';
import JobCard from '@/components/shared/JobCard';

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const vacancy = await getVacancyById(params.id);
  if (!vacancy) notFound();

  const salario = formatSalario(
    vacancy.salarioMin ? Number(vacancy.salarioMin) : null,
    vacancy.salarioMax ? Number(vacancy.salarioMax) : null,
  );
  const mod = modalidadLabel(vacancy.tipoTrabajo);
  const modColor =
    mod === 'Remoto'     ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    mod === 'Híbrido'    ? 'bg-blue-50 text-blue-700 border-blue-200' :
                           'bg-slate-50 text-slate-600 border-slate-200';

  // Similar vacancies
  const allVacancies = await getActiveVacancies(6);
  const similar = allVacancies
    .filter((v: any) => v.id !== vacancy.id)
    .slice(0, 3)
    .map(toJobCard);

  // Parse requisitos into lines
  const reqLines = (vacancy.requisitos ?? '').split('\n').filter((l: string) => l.trim() && !l.startsWith('Categoría:'));
  const descLines = (vacancy.descripcion ?? '').split('\n').filter((l: string) => l.trim());

  return (
    <div className="min-h-screen bg-slate-50">
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
        <div className="lg:col-span-2 space-y-6">
          {/* Job header */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#1A56DB]/10 flex items-center justify-center font-black text-[#1A56DB] text-xl shrink-0">
                {vacancy.company.nombre.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">{vacancy.titulo}</h1>
                <p className="text-sm text-slate-500 mt-0.5 font-medium">{vacancy.company.nombre}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <MapPin className="h-3.5 w-3.5" /> {vacancy.ubicacion}
              </span>
              <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium ${modColor}`}>
                <Wifi className="h-3.5 w-3.5" /> {mod}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <DollarSign className="h-3.5 w-3.5" /> {salario}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Clock className="h-3.5 w-3.5" /> {timeAgo(vacancy.createdAt)}
              </span>
              <Badge className="text-xs border bg-blue-50 text-blue-700 border-blue-200">
                {contratoLabel(vacancy.tipoContrato)}
              </Badge>
              <Badge className="text-xs border bg-purple-50 text-purple-700 border-purple-200">
                {experienciaLabel(vacancy.experiencia)}
              </Badge>
            </div>

            <PostularButton vacancyId={vacancy.id} />
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3">Sobre el puesto</h2>
              {descLines.map((line: string, i: number) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed mb-2">{line}</p>
              ))}
            </div>

            {reqLines.length > 0 && (
              <>
                <Separator />
                <div>
                  <h2 className="text-base font-bold text-slate-900 mb-3">Requisitos</h2>
                  <ul className="space-y-2">
                    {reqLines.map((r: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-[#1A56DB] shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3 sticky top-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A56DB]/10 flex items-center justify-center font-bold text-[#1A56DB]">
                {vacancy.company.nombre.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{vacancy.company.nombre}</p>
                <p className="text-xs text-slate-400">{vacancy.company.industria}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between"><span className="text-slate-400">Modalidad</span><span className="font-medium">{mod}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Ubicación</span><span className="font-medium">{vacancy.ubicacion}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Salario</span><span className="font-medium">{salario}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Contrato</span><span className="font-medium">{contratoLabel(vacancy.tipoContrato)}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Experiencia</span><span className="font-medium">{experienciaLabel(vacancy.experiencia)}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Postulantes</span><span className="font-medium">{vacancy._count.applications}</span></div>
            </div>
            <Separator />
            <PostularButton vacancyId={vacancy.id} />
          </div>

          {similar.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Empleos similares</p>
              <div className="space-y-3">
                {similar.map((j: any) => (
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
