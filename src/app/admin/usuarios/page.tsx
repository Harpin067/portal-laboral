import { Users, ShieldCheck, Building2, User, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { timeAgo } from '@/lib/helpers';
import { ToggleUsuarioButton } from './ToggleUsuarioButton';

async function getUsuarios() {
  return (prisma as any).user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { company: { select: { nombre: true, isVerified: true } } },
  });
}

const roleBadge: Record<string, string> = {
  SUPERADMIN: 'bg-purple-100 text-purple-700',
  EMPRESA:    'bg-blue-100 text-blue-700',
  CANDIDATO:  'bg-emerald-100 text-emerald-700',
};

export default async function UsuariosPage() {
  const usuarios = await getUsuarios();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-[#111827] flex items-center gap-2">
          <Users className="h-5 w-5 text-[#60a5fa]" />
          Gestión de Usuarios
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">{usuarios.length} usuarios registrados</p>
      </div>

      <Card className="border border-gray-200 bg-white">
        <CardContent className="px-0 pb-0 pt-0">
          <div className="grid grid-cols-12 text-xs font-medium text-gray-400 uppercase tracking-wide px-5 py-3 border-b border-gray-100">
            <span className="col-span-4">Usuario</span>
            <span className="col-span-2">Rol</span>
            <span className="col-span-2">Empresa</span>
            <span className="col-span-2">Registro</span>
            <span className="col-span-2 text-right">Estado</span>
          </div>

          <div className="divide-y divide-gray-50">
            {usuarios.map((u: any) => (
              <div key={u.id} className="grid grid-cols-12 items-center px-5 py-3 hover:bg-gray-50/50 transition-colors">
                <div className="col-span-4 flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#1A56DB]/10 flex items-center justify-center font-bold text-[#1A56DB] text-xs shrink-0">
                    {(u.name ?? u.email).charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate">{u.name ?? 'Sin nombre'}</p>
                    <p className="text-xs text-gray-400 truncate">{u.email}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <Badge className={`text-xs border-0 ${roleBadge[u.role] ?? 'bg-gray-100 text-gray-600'}`}>
                    {u.role}
                  </Badge>
                </div>
                <div className="col-span-2">
                  {u.company ? (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Building2 className="h-3 w-3" />
                      <span className="truncate">{u.company.nombre}</span>
                      {u.company.isVerified && <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0" />}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-300">—</span>
                  )}
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-gray-400">{timeAgo(u.createdAt)}</span>
                </div>
                <div className="col-span-2 flex justify-end">
                  {u.role === 'SUPERADMIN' ? (
                    <Badge className="text-xs bg-purple-50 text-purple-600 border-0">Admin</Badge>
                  ) : (
                    <ToggleUsuarioButton userId={u.id} isActive={u.isActive} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
