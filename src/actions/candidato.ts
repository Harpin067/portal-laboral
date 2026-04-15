'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function postularseVacante(vacancyId: string) {
  const session = await getServerSession(authOptions);
  const userId  = (session?.user as any)?.id as string | undefined;
  if (!userId) throw new Error('Inicia sesión para postularte.');

  // Verificar si ya se postuló
  const existing = await (prisma as any).application.findUnique({
    where: { vacancyId_userId: { vacancyId, userId } },
  });
  if (existing) throw new Error('Ya te postulaste a esta vacante.');

  await (prisma as any).application.create({
    data: {
      vacancyId,
      userId,
      status:     'nuevo',
      cvSnapshot: 'Perfil del candidato',
    },
  });

  revalidatePath('/candidato/dashboard');
  revalidatePath('/empleos');
}
