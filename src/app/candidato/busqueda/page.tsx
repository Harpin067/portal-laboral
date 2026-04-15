import { Briefcase } from 'lucide-react';
import CAN_FilterPanel from '@/components/candidato/CAN-FilterPanel';
import CAN_JobCard from '@/components/candidato/CAN-JobCard';
import { getActiveVacancies } from '@/lib/vacancy-helpers';
import { formatSalario, modalidadLabel, contratoLabel, timeAgo } from '@/lib/helpers';

function toCanJob(v: any) {
  const mod = modalidadLabel(v.tipoTrabajo);
  return {
    id:           v.id,
    titulo:       v.titulo,
    empresa:      v.company?.nombre ?? 'Empresa',
    ubicacion:    v.ubicacion,
    modalidad:    mod as 'Presencial' | 'Remoto' | 'Híbrido',
    tipoContrato: contratoLabel(v.tipoContrato),
    salario:      formatSalario(
      v.salarioMin ? Number(v.salarioMin) : null,
      v.salarioMax ? Number(v.salarioMax) : null,
    ),
    tags:         (v.requisitos ?? '').split('\n').filter((l: string) => l.trim() && !l.startsWith('Categoría:')).slice(0, 4).map((l: string) => l.trim().slice(0, 20)),
    postedAt:     timeAgo(v.createdAt),
    logoColor:    '#1A56DB',
  };
}

export default async function BusquedaPage() {
  const raw  = await getActiveVacancies();
  const jobs = raw.map(toCanJob);

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div>
        <h1 className="text-xl font-bold text-[#111827]">Búsqueda de Empleo</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Encontramos{' '}
          <span className="font-semibold text-primary">{jobs.length} ofertas</span>{' '}
          disponibles en El Salvador.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:w-72 shrink-0">
          <div className="lg:sticky lg:top-6">
            <CAN_FilterPanel />
          </div>
        </aside>

        <section className="flex-1 min-w-0">
          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Briefcase className="h-10 w-10 text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">No encontramos ofertas disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {jobs.map((job: any) => (
                <CAN_JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
