import { Search, SlidersHorizontal } from 'lucide-react';
import JobCard from '@/components/shared/JobCard';
import { getActiveVacancies, toJobCard } from '@/lib/vacancy-helpers';
import { EmpleosFilters } from './EmpleosFilters';

export default async function EmpleosPage({
  searchParams,
}: {
  searchParams: { q?: string; loc?: string; mod?: string };
}) {
  const raw = await getActiveVacancies();
  let jobs = raw.map(toJobCard);

  // Server-side filtering from URL params
  const q   = searchParams.q?.toLowerCase() ?? '';
  const loc = searchParams.loc?.toLowerCase() ?? '';
  const mod = searchParams.mod ?? '';

  if (q) {
    jobs = jobs.filter(
      (j: any) =>
        j.titulo.toLowerCase().includes(q) ||
        j.empresa.toLowerCase().includes(q) ||
        j.tag.toLowerCase().includes(q)
    );
  }
  if (loc) {
    jobs = jobs.filter(
      (j: any) => j.ubicacion.toLowerCase().includes(loc) || j.modalidad === 'Remoto'
    );
  }
  if (mod && mod !== 'Todos') {
    jobs = jobs.filter((j: any) => j.modalidad === mod);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#0f2d6b] via-[#1A56DB] to-[#1e6fb8] pt-8 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1">Explorar empleos</h1>
          <p className="text-blue-200 text-sm mb-6">{jobs.length} vacantes disponibles</p>
          <EmpleosFilters defaultQ={searchParams.q} defaultLoc={searchParams.loc} />
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
            <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500">No encontramos vacantes con esos filtros.</p>
            <p className="text-xs text-slate-400 mt-1">Intenta con otros términos o elimina filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
