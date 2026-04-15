import type { JobCardData } from '@/components/shared/JobCard';
import { timeAgo, formatSalario, modalidadLabel } from '@/lib/helpers';
import { prisma } from '@/lib/prisma';

/** Fetches active+approved vacancies from DB with company info. */
export async function getActiveVacancies(limit?: number) {
  return (prisma as any).vacancy.findMany({
    where: { status: 'activa', isApproved: true, company: { isVerified: true } },
    orderBy: { createdAt: 'desc' },
    ...(limit ? { take: limit } : {}),
    include: { company: { select: { nombre: true, industria: true, logoUrl: true } } },
  });
}

/** Fetches a single vacancy by ID with full company data. */
export async function getVacancyById(id: string) {
  return (prisma as any).vacancy.findUnique({
    where: { id },
    include: {
      company: { select: { nombre: true, industria: true, logoUrl: true, ubicacion: true, descripcion: true } },
      _count: { select: { applications: true } },
    },
  });
}

/** Maps a Prisma vacancy row (+company) to the JobCardData type used by the shared JobCard component. */
export function toJobCard(v: any): JobCardData {
  return {
    id:        v.id,
    titulo:    v.titulo,
    empresa:   v.company?.nombre ?? 'Empresa',
    logo:      (v.company?.nombre ?? 'E').charAt(0).toUpperCase(),
    ubicacion: v.ubicacion,
    modalidad: modalidadLabel(v.tipoTrabajo),
    salario:   formatSalario(
      v.salarioMin ? Number(v.salarioMin) : null,
      v.salarioMax ? Number(v.salarioMax) : null,
    ),
    tag:       v.company?.industria ?? '',
    publicado: timeAgo(v.createdAt),
  };
}
