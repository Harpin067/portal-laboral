'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function actualizarPerfilCandidato(formData: FormData) {
  const session = await getServerSession(authOptions);
  const userId  = (session?.user as any)?.id as string | undefined;
  if (!userId) throw new Error('No autenticado.');

  const nombre    = formData.get('nombre')   as string;
  const apellidos = formData.get('apellidos') as string;
  const telefono  = formData.get('telefono')  as string;

  await (prisma as any).user.update({
    where: { id: userId },
    data: {
      nombre:    nombre    || undefined,
      apellidos: apellidos || undefined,
      telefono:  telefono  || undefined,
      name:      nombre ? `${nombre} ${apellidos ?? ''}`.trim() : undefined,
    },
  });

  revalidatePath('/candidato/perfil');
  revalidatePath('/candidato/dashboard');
}

export async function actualizarPerfilEmpresa(formData: FormData) {
  const session = await getServerSession(authOptions);
  const userId  = (session?.user as any)?.id as string | undefined;
  if (!userId) throw new Error('No autenticado.');

  const nombre      = formData.get('nombre')      as string;
  const descripcion = formData.get('descripcion')  as string;
  const sitioWeb    = formData.get('sitioWeb')     as string;
  const ubicacion   = formData.get('ubicacion')    as string;
  const industria   = formData.get('industria')    as string;

  const company = await (prisma as any).company.findUnique({
    where: { userId },
  });

  if (!company) throw new Error('Perfil de empresa no encontrado.');

  await (prisma as any).company.update({
    where: { id: company.id },
    data: {
      nombre:      nombre      || undefined,
      descripcion: descripcion || undefined,
      sitioWeb:    sitioWeb    || undefined,
      ubicacion:   ubicacion   || undefined,
      industria:   industria   || undefined,
    },
  });

  revalidatePath('/empresa/perfil');
  revalidatePath('/empresa/dashboard');
}
