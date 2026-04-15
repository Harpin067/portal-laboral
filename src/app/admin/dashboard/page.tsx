import {
  Users, Building2, Briefcase, FileText,
  TrendingUp, ShieldCheck, CheckCircle2, XCircle,
  Clock, AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { timeAgo } from '@/lib/helpers';
import { ValidarEmpresaButtons } from './ValidarEmpresaButtons';

async function getMetrics() {
  const p = prisma as any;
  const [totalUsers, empresasPendientes, vacantesActivas, totalPostulaciones] = await Promise.all([
    p.user.count(),
    p.company.count({ where: { isVerified: false } }),
    p.vacancy.count({ where: { status: 'activa' } }),
    p.application.count(),
  ]);
  return { totalUsers, empresasPendientes, vacantesActivas, totalPostulaciones };
}

async function getEmpresasPendientes() {
  const companies = await (prisma as any).company.findMany({
    where: { isVerified: false },
    include: { user: { select: { email: true, createdAt: true } } },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });
  return companies;
}

export default async function AdminDashboardPage() {
  const metrics   = await getMetrics();
  const pendientes = await getEmpresasPendientes();

  const cards = [
    { label: 'Total Usuarios',              value: metrics.totalUsers,          icon: Users,     color: 'text-[#60a5fa]', bg: 'bg-[#1A56DB]/15' },
    { label: 'Empresas Pend. Activación',   value: metrics.empresasPendientes,  icon: Building2, color: 'text-yellow-500', bg: 'bg-yellow-500/15' },
    { label: 'Vacantes Activas',            value: metrics.vacantesActivas,     icon: Briefcase, color: 'text-emerald-500', bg: 'bg-emerald-500/15' },
    { label: 'Total Postulaciones',         value: metrics.totalPostulaciones,  icon: FileText,  color: 'text-orange-500', bg: 'bg-orange-500/15' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-5 w-5 text-[#60a5fa]" />
            <h1 className="text-xl font-bold text-[#111827]">Panel de Control Global</h1>
          </div>
          <p className="text-sm text-gray-500">
            Vista general del estado de IntegraJobs · El Salvador
          </p>
        </div>
        <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          Sistema operativo
        </Badge>
      </div>

      {/* Métricas reales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((m) => (
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

      {/* Empresas pendientes */}
      <Card className="border border-gray-200 bg-white">
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-sm font-semibold text-[#111827] flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            Empresas Pendientes de Activación
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          {pendientes.length === 0 ? (
            <div className="flex flex-col items-center py-10 gap-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              <p className="text-sm text-gray-500">No hay empresas pendientes de activación.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {pendientes.map((c: any) => (
                <div key={c.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#1A56DB]/10 flex items-center justify-center font-bold text-[#1A56DB] text-xs shrink-0">
                      {c.nombre.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#111827] truncate">{c.nombre}</p>
                      <p className="text-xs text-gray-400">{c.user.email} · {c.industria} · {timeAgo(c.createdAt)}</p>
                    </div>
                  </div>
                  <ValidarEmpresaButtons companyId={c.id} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
