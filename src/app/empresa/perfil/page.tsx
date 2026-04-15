import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PerfilEmpresaForm } from './PerfilEmpresaForm';

async function getCompanyProfile(email: string) {
  const user = await (prisma as any).user.findUnique({
    where: { email },
    include: { company: true },
  });
  return user?.company ?? null;
}

export default async function PerfilEmpresaPage() {
  const session = await getServerSession(authOptions);
  const company = session?.user?.email ? await getCompanyProfile(session.user.email) : null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#111827] flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[#1A56DB]" /> Perfil de Empresa
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">Actualiza la información de tu empresa.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-[#111827]">Información Corporativa</CardTitle>
          <CardDescription className="text-xs">Estos datos serán visibles para los candidatos.</CardDescription>
        </CardHeader>
        <CardContent>
          <PerfilEmpresaForm company={company} />
        </CardContent>
      </Card>
    </div>
  );
}
