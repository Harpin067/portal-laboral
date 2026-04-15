import Link from 'next/link';
import {
  FileText, Eye, Bell, TrendingUp, Briefcase,
  ArrowUpRight, CheckCircle2, Search,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { timeAgo, modalidadLabel, formatSalario } from '@/lib/helpers';

async function getCandidatoData(userId: string) {
  const p = prisma as any;

  const [solicitudesCount, entrevistasCount, alertasCount, solicitudes, vacantesRecientes] = await Promise.all([
    p.application.count({ where: { userId } }),
    p.application.count({ where: { userId, status: 'en_proceso' } }),
    p.alert.count({ where: { userId, isActive: true } }),
    p.application.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        vacancy: {
          select: { titulo: true, company: { select: { nombre: true } } },
        },
      },
    }),
    p.vacancy.findMany({
      where: { status: 'activa', isApproved: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: { company: { select: { nombre: true } } },
    }),
  ]);

  return { solicitudesCount, entrevistasCount, alertasCount, solicitudes, vacantesRecientes };
}

const estadoColor: Record<string, string> = {
  nuevo:      'bg-blue-100 text-blue-700',
  en_proceso: 'bg-yellow-100 text-yellow-700',
  rechazado:  'bg-red-100 text-red-700',
  contratado: 'bg-emerald-100 text-emerald-700',
};

const estadoLabel: Record<string, string> = {
  nuevo:      'Enviado',
  en_proceso: 'En proceso',
  rechazado:  'Rechazado',
  contratado: 'Contratado',
};

export default async function CandidatoDashboardPage() {
  const session = await getServerSession(authOptions);
  const userId  = (session?.user as any)?.id as string | undefined;
  const data    = userId ? await getCandidatoData(userId) : null;
  const userName = session?.user?.name ?? 'Candidato';

  const metricas = [
    { label: 'Solicitudes enviadas',   value: data?.solicitudesCount ?? 0, icon: FileText, color: 'text-blue-600',    bg: 'bg-blue-50' },
    { label: 'En proceso / Entrevista', value: data?.entrevistasCount ?? 0, icon: Eye,      color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Alertas activas',        value: data?.alertasCount ?? 0,     icon: Bell,     color: 'text-orange-600',  bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Encabezado */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Bienvenido, {userName.split(' ')[0]}</h1>
          <p className="text-sm text-gray-500 mt-0.5">Aquí tienes un resumen de tu actividad.</p>
        </div>
        <Link href="/candidato/busqueda">
          <Button size="sm" className="bg-[#1A56DB] hover:bg-[#1A56DB]/90 text-white gap-2 shadow-sm">
            <Briefcase className="h-4 w-4" /> Buscar empleos
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Postulaciones recientes */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-200 bg-white h-full">
            <CardHeader className="pb-2 pt-5 px-5 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold text-[#111827]">Postulaciones Recientes</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {!data?.solicitudes?.length ? (
                <div className="flex flex-col items-center py-10 gap-2">
                  <Search className="h-8 w-8 text-gray-300" />
                  <p className="text-sm text-gray-500">Aún no te has postulado a ninguna vacante.</p>
                  <Link href="/empleos">
                    <Button size="sm" variant="outline" className="mt-1 gap-2 text-[#1A56DB]">
                      <Briefcase className="h-4 w-4" /> Explorar empleos
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {data.solicitudes.map((s: any) => (
                    <div key={s.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#1A56DB]/10 flex items-center justify-center text-[#1A56DB] font-bold text-xs shrink-0">
                          {s.vacancy.company.nombre.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-[#111827] truncate">{s.vacancy.titulo}</p>
                          <p className="text-xs text-gray-400">{s.vacancy.company.nombre} · {timeAgo(s.createdAt)}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs border-0 ${estadoColor[s.status] ?? 'bg-gray-100'}`}>
                        {estadoLabel[s.status] ?? s.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Vacantes recomendadas (reales, las más recientes) */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader className="pb-2 pt-5 px-5">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#111827]">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Vacantes Recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-3">
            {(data?.vacantesRecientes ?? []).map((v: any) => (
              <Link key={v.id} href={`/empleos/${v.id}`} className="block">
                <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 rounded px-1 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-[#111827]">{v.titulo}</p>
                    <p className="text-xs text-gray-400">{v.company.nombre}</p>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                </div>
              </Link>
            ))}
            <Link href="/empleos">
              <Button variant="outline" size="sm" className="w-full mt-2 h-8 text-xs text-[#1A56DB] border-[#1A56DB]/30 hover:bg-[#1A56DB]/5">
                Ver más empleos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
