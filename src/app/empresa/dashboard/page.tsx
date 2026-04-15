import Link from 'next/link';
import {
  Briefcase, Users, CalendarCheck, PlusCircle, FileX2, TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { timeAgo, modalidadLabel, formatSalario } from '@/lib/helpers';

async function getEmpresaData(email: string) {
  const p = prisma as any;
  const user = await p.user.findUnique({
    where: { email },
    include: { company: true },
  });
  if (!user?.company) return null;

  const companyId = user.company.id;

  const [vacantesActivas, totalPostulantes, entrevistasPendientes, vacantes] = await Promise.all([
    p.vacancy.count({ where: { companyId, status: 'activa' } }),
    p.application.count({
      where: { vacancy: { companyId } },
    }),
    p.application.count({
      where: { vacancy: { companyId }, status: 'en_proceso' },
    }),
    p.vacancy.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { _count: { select: { applications: true } } },
    }),
  ]);

  return { companyName: user.company.nombre, vacantesActivas, totalPostulantes, entrevistasPendientes, vacantes };
}

const statusBadge: Record<string, string> = {
  activa:   'bg-emerald-50 text-emerald-700',
  pausada:  'bg-yellow-50 text-yellow-700',
  cerrada:  'bg-gray-100 text-gray-600',
  rechazada:'bg-red-50 text-red-600',
};

export default async function EmpresaDashboardPage() {
  const session = await getServerSession(authOptions);
  const data = session?.user?.email ? await getEmpresaData(session.user.email) : null;

  const metricas = [
    { label: 'Vacantes Activas',       value: data?.vacantesActivas ?? 0,       icon: Briefcase,     color: 'text-[#1A56DB]',    bg: 'bg-[#1A56DB]/10' },
    { label: 'Total Postulantes',      value: data?.totalPostulantes ?? 0,      icon: Users,         color: 'text-emerald-600',  bg: 'bg-emerald-50' },
    { label: 'Entrevistas Pendientes', value: data?.entrevistasPendientes ?? 0, icon: CalendarCheck, color: 'text-orange-600',   bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Panel de Empresa</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {data?.companyName ? `${data.companyName} · ` : ''}Gestiona tus vacantes y candidatos.
          </p>
        </div>
        <Link href="/empresa/vacantes/nueva">
          <Button size="sm" className="bg-[#1A56DB] hover:bg-[#1A56DB]/90 text-white gap-2 shadow-sm">
            <PlusCircle className="h-4 w-4" /> Publicar Vacante
          </Button>
        </Link>
      </div>

      {/* Métricas reales */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metricas.map((m) => (
          <Card key={m.label} className="border border-gray-200 bg-white hover:shadow-sm transition-shadow">
            <CardContent className="pt-5 pb-5 px-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${m.bg}`}>
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                </div>
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-[#111827]">{m.value}</p>
              <p className="text-xs font-medium text-gray-600 mt-0.5">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vacantes reales */}
      <Card className="border border-gray-200 bg-white">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-sm font-semibold text-[#111827]">
            Últimas vacantes publicadas
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="grid grid-cols-4 text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-100">
            <span className="col-span-2">Puesto</span>
            <span className="text-center">Postulantes</span>
            <span className="text-right">Estado</span>
          </div>

          {!data?.vacantes?.length ? (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <div className="p-3 rounded-full bg-gray-100">
                <FileX2 className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500">Aún no has publicado ninguna vacante</p>
              <Link href="/empresa/vacantes/nueva">
                <Button size="sm" className="mt-1 bg-[#1A56DB] hover:bg-[#1A56DB]/90 text-white gap-2">
                  <PlusCircle className="h-4 w-4" /> Crear nueva vacante
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {data.vacantes.map((v: any) => (
                <div key={v.id} className="grid grid-cols-4 items-center py-3">
                  <div className="col-span-2 min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate">{v.titulo}</p>
                    <p className="text-xs text-gray-400">{v.ubicacion} · {modalidadLabel(v.tipoTrabajo)} · {timeAgo(v.createdAt)}</p>
                  </div>
                  <p className="text-sm font-semibold text-center text-[#111827]">{v._count.applications}</p>
                  <div className="flex justify-end">
                    <Badge className={`text-xs border-0 ${statusBadge[v.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
