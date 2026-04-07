import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import JobCard from '@/components/shared/JobCard';
import { MOCK_JOBS, CATEGORIAS_META } from '@/lib/mock-jobs';

export function generateStaticParams() {
  return Object.keys(CATEGORIAS_META).map((slug) => ({ categoria: slug }));
}

export default function CategoriaPage({ params }: { params: { categoria: string } }) {
  const meta = CATEGORIAS_META[params.categoria];
  if (!meta) notFound();

  const jobs = MOCK_JOBS.filter((j) => j.categoriaSlug === params.categoria);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f2d6b] via-[#1A56DB] to-[#1e6fb8] pt-8 pb-14 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/empleos">
            <Button variant="ghost" size="sm" className="gap-1.5 text-blue-200 hover:text-white mb-4 -ml-2 cursor-pointer">
              <ArrowLeft className="h-4 w-4" /> Todos los empleos
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Badge className={`text-xs border ${meta.color}`}>{meta.label}</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1">
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
            {jobs.map((job) => (
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

        {/* Other categories */}
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
