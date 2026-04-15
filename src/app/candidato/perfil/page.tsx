import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PerfilCandidatoForm } from './PerfilCandidatoForm';

async function getProfile(email: string) {
  return (prisma as any).user.findUnique({
    where: { email },
    select: { id: true, nombre: true, apellidos: true, email: true, telefono: true, createdAt: true },
  });
}

export default async function PerfilCandidatoPage() {
  const session = await getServerSession(authOptions);
  const profile = session?.user?.email ? await getProfile(session.user.email) : null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#111827] flex items-center gap-2">
          <User className="h-5 w-5 text-[#1A56DB]" /> Mi Perfil
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">Actualiza tu información personal.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-[#111827]">Datos Personales</CardTitle>
          <CardDescription className="text-xs">Esta información es visible para las empresas cuando te postulas.</CardDescription>
        </CardHeader>
        <CardContent>
          <PerfilCandidatoForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
