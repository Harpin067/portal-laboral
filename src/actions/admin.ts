'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const role = ((session?.user as any)?.role as string | undefined)?.toUpperCase();
  if (role !== 'SUPERADMIN') throw new Error('Acceso denegado.');
  return session!;
}

export async function validarEmpresa(companyId: string, decision: 'APPROVED' | 'REJECTED') {
  await requireAdmin();

  if (decision === 'APPROVED') {
    await (prisma as any).company.update({
      where: { id: companyId },
      data:  { isVerified: true },
    });
  } else {
    // Rechazada: desactivar la cuenta del usuario
    const company = await (prisma as any).company.findUnique({
      where: { id: companyId },
      select: { userId: true },
    });
    if (company) {
      await (prisma as any).user.update({
        where: { id: company.userId },
        data:  { isActive: false },
      });
    }
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/admin/usuarios');
}

export async function toggleUsuarioActivo(userId: string, isActive: boolean) {
  await requireAdmin();

  await (prisma as any).user.update({
    where: { id: userId },
    data:  { isActive },
  });

  revalidatePath('/admin/usuarios');
}
