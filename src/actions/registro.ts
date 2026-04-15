'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function registrarCandidato(formData: FormData) {
  const nombre    = formData.get('nombre')    as string;
  const apellidos = formData.get('apellidos') as string;
  const email     = formData.get('email')     as string;
  const password  = formData.get('password')  as string;

  if (!nombre || !email || !password) {
    throw new Error('Todos los campos son obligatorios.');
  }

  const exists = await (prisma as any).user.findUnique({ where: { email } });
  if (exists) throw new Error('Ya existe una cuenta con ese correo.');

  const passwordHash = await bcrypt.hash(password, 12);

  await (prisma as any).user.create({
    data: {
      email,
      name:      `${nombre} ${apellidos ?? ''}`.trim(),
      nombre,
      apellidos: apellidos || null,
      passwordHash,
      role:     'CANDIDATO',
      isActive: true,
    },
  });

  redirect('/login');
}

export async function registrarEmpresa(formData: FormData) {
  const empresaNombre = formData.get('empresa')  as string;
  const email         = formData.get('email')    as string;
  const password      = formData.get('password') as string;
  const industria     = formData.get('industria') as string || 'General';

  if (!empresaNombre || !email || !password) {
    throw new Error('Todos los campos son obligatorios.');
  }

  const exists = await (prisma as any).user.findUnique({ where: { email } });
  if (exists) throw new Error('Ya existe una cuenta con ese correo.');

  const passwordHash = await bcrypt.hash(password, 12);

  await (prisma as any).user.create({
    data: {
      email,
      name:          empresaNombre,
      empresaNombre,
      passwordHash,
      role:     'EMPRESA',
      isActive: false,
      company: {
        create: {
          nombre:      empresaNombre,
          descripcion: `Empresa ${empresaNombre}`,
          ubicacion:   'El Salvador',
          industria,
          isVerified:  false,
        },
      },
    },
  });

  redirect('/login?type=empresa&registered=1');
}
