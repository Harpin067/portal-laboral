'use client';

import { Briefcase } from 'lucide-react';
import CAN_FilterPanel from '@/components/candidato/CAN-FilterPanel';
import CAN_JobCard, { Job } from '@/components/candidato/CAN-JobCard';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    titulo: 'Frontend Developer Senior',
    empresa: 'Tigo El Salvador',
    ubicacion: 'San Salvador, El Salvador',
    modalidad: 'Híbrido',
    tipoContrato: 'Tiempo completo',
    salario: '$1,800–$2,500',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    postedAt: 'Hace 1 día',
    logoColor: '#1A56DB',
  },
  {
    id: '2',
    titulo: 'UX / Product Designer',
    empresa: 'Banco Agrícola',
    ubicacion: 'San Salvador, El Salvador',
    modalidad: 'Presencial',
    tipoContrato: 'Tiempo completo',
    salario: '$1,500–$2,200',
    tags: ['Figma', 'Design Systems', 'Investigación UX'],
    postedAt: 'Hace 2 días',
    logoColor: '#10B981',
  },
  {
    id: '3',
    titulo: 'Backend Engineer – Node.js',
    empresa: 'Applaudo Studios',
    ubicacion: 'Remoto',
    modalidad: 'Remoto',
    tipoContrato: 'Tiempo completo',
    salario: '$2,500–$3,800',
    tags: ['Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    postedAt: 'Hace 3 días',
    logoColor: '#EF4444',
  },
  {
    id: '4',
    titulo: 'Product Manager',
    empresa: 'RIMAC Seguros',
    ubicacion: 'San Salvador, El Salvador',
    modalidad: 'Híbrido',
    tipoContrato: 'Tiempo completo',
    salario: '$2,800–$4,000',
    tags: ['Roadmap', 'Agile', 'OKRs', 'Stakeholders'],
    postedAt: 'Hace 5 días',
    logoColor: '#8B5CF6',
  },
  {
    id: '5',
    titulo: 'Data Analyst Jr.',
    empresa: 'Scotiabank El Salvador',
    ubicacion: 'San Salvador, El Salvador',
    modalidad: 'Presencial',
    tipoContrato: 'Prácticas',
    salario: '$700–$1,000',
    tags: ['Python', 'SQL', 'Power BI', 'Excel'],
    postedAt: 'Hace 1 semana',
    logoColor: '#F59E0B',
  },
];

export default function BusquedaPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#111827]">Búsqueda de Empleo</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Encontramos{' '}
          <span className="font-semibold text-primary">{MOCK_JOBS.length} ofertas</span>{' '}
          que podrían interesarte.
        </p>
      </div>

      {/* Layout 2 columnas */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Panel de filtros */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="lg:sticky lg:top-6">
            <CAN_FilterPanel />
          </div>
        </aside>

        {/* Grid de resultados */}
        <section className="flex-1 min-w-0">
          {MOCK_JOBS.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Briefcase className="h-10 w-10 text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">No encontramos ofertas con esos filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {MOCK_JOBS.map((job) => (
                <CAN_JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
