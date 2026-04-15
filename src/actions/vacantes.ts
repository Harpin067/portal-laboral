'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { TipoTrabajo, TipoContrato, Experiencia } from '@prisma/client';

export async function crearVacante(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error('No autenticado.');
  }

  const user = await (prisma as any).user.findUnique({
    where:   { email: session.user.email },
    include: { company: true },
  });

  if (!user?.company) {
    throw new Error('No se encontró un perfil de empresa asociado.');
  }

  const titulo        = formData.get('titulo')        as string;
  const categoria     = formData.get('categoria')     as string;
  const ubicacion     = formData.get('ubicacion')     as string;
  const tipoTrabajo   = formData.get('modalidad')     as TipoTrabajo;
  const tipoContrato  = formData.get('tipoContrato')  as TipoContrato;
  const experiencia   = formData.get('experiencia')   as Experiencia;
  const salario       = formData.get('salario')       as string;
  const descripcion   = formData.get('descripcion')   as string;
  const requisitos    = formData.get('requisitos')     as string;
  const contacto      = formData.get('contacto')      as string;

  if (!titulo || !ubicacion || !tipoTrabajo || !tipoContrato || !experiencia || !descripcion) {
    throw new Error('Completa todos los campos obligatorios.');
  }

  // Parsear rango salarial
  let salarioMin: number | undefined;
  let salarioMax: number | undefined;
  if (salario) {
    const nums = salario.replace(/[^0-9.\-]/g, ' ').trim().split(/\s+/).filter(Boolean);
    if (nums[0]) salarioMin = parseFloat(nums[0]);
    if (nums[1]) salarioMax = parseFloat(nums[1]);
  }

  const requisitosCompletos = categoria
    ? `Categoría: ${categoria}\n\n${requisitos ?? ''}`
    : (requisitos ?? '');

  await (prisma as any).vacancy.create({
    data: {
      companyId:    user.company.id,
      titulo,
      descripcion,
      requisitos:   requisitosCompletos,
      ubicacion,
      tipoTrabajo,
      tipoContrato,
      experiencia,
      salarioMin:   salarioMin ?? null,
      salarioMax:   salarioMax ?? null,
      contacto:     contacto || session.user.email,
      status:       'activa',
      isApproved:   true,
    },
  });

  revalidatePath('/empresa/dashboard');
  revalidatePath('/empresa/vacantes');
  revalidatePath('/empleos');
  redirect('/empresa/dashboard');
}
