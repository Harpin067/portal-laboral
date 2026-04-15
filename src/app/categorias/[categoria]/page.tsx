import Link from 'next/link';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import JobCard from '@/components/shared/JobCard';
import { getActiveVacancies, toJobCard } from '@/lib/vacancy-helpers';

const CATEGORIAS_META: Record<string, { label: string; color: string }> = {
  tecnologia:  { label: 'Tecnología',  color: 'bg-blue-50 text-blue-700 border-blue-200' },
  diseno:      { label: 'Diseño',      color: 'bg-purple-50 text-purple-700 border-purple-200' },
  finanzas:    { label: 'Finanzas',    color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ingenieria:  { label: 'Ingeniería',  color: 'bg-orange-50 text-orange-700 border-orange-200' },
  salud:       { label: 'Salud',       color: 'bg-red-50 text-red-700 border-red-200' },
  educacion:   { label: 'Educación',   color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  retail:      { label: 'Retail',      color: 'bg-pink-50 text-pink-700 border-pink-200' },
  marketing:   { label: 'Marketing',   color: 'bg-teal-50 text-teal-700 border-teal-200' },
  manufactura: { label: 'Manufactura', color: 'bg-slate-50 text-slate-700 border-slate-200' },
};

export default async function CategoriaPage({ params }: { params: { categoria: string } }) {
  const meta = CATEGORIAS_META[params.categoria];
  if (!meta) {
    const { notFound } = await import('next/navigation');
    notFound();
  }

  const allVacancies = await getActiveVacancies();
  // Filter by company industria matching the category label
  const filtered = allVacancies.filter(
    (v: any) => v.company?.industria?.toLowerCase() === meta.label.toLowerCase()
  );
  const jobs = filtered.map(toJobCard);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#0f2d6b] via-[#1A56DB] to-[#1e6fb8] pt-8 pb-14 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/empleos">
            <Button variant="ghost" size="sm" className="gap-1.5 text-blue-200 hover:text-white mb-4 -ml-2 cursor-pointer">
              <ArrowLeft className="h-4 w-4" /> Todos los empleos
            </Button>
          </Link>
          <Badge className={`text-xs border ${meta.color}`}>{meta.label}</Badge>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1 mt-2">
            Empleos en {meta.label}
          </h1>
          <p className="text-blue-200 text-sm">
            {jobs.length} vacante{jobs.length !== 1 ? 's' : ''} disponible{jobs.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {jobs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Briefcase className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500">No hay vacantes en esta categoría aún.</p>
            <Link href="/empleos" className="inline-block mt-4">
              <Button variant="outline" size="sm">Ver todos los empleos</Button>
            </Link>
          </div>
        )}

        <div className="mt-12">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Otras categorías</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORIAS_META)
              .filter(([slug]) => slug !== params.categoria)
              .map(([slug, m]) => (
                <Link key={slug} href={`/categorias/${slug}`}>
                  <Badge className={`text-xs border cursor-pointer hover:opacity-80 transition-opacity ${m.color}`}>
                    {m.label}
                  </Badge>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
