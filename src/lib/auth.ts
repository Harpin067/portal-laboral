import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:     { label: 'Email',      type: 'email'    },
        password:  { label: 'Password',   type: 'password' },
        loginType: { label: 'Login Type', type: 'text'     },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await (prisma as any).user.findUnique({
          where: { email: credentials.email },
          include: { company: true },
        });

        if (!user || !user.passwordHash) return null;

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        if (role === 'EMPRESA' && !user.isActive) {
          throw new Error('Tu cuenta está en revisión. Un administrador debe verificar tu empresa antes de poder ingresar.');
        }

        if (!user.isActive) {
          throw new Error('Tu cuenta ha sido desactivada. Contacta a soporte.');
        }

        const role: string      = user.role;
        const loginType: string = credentials.loginType ?? '';

        // RBAC: candidato solo desde pestaña candidato
        if (role === 'CANDIDATO' && loginType !== 'candidato') {
          throw new Error('Esta cuenta pertenece a un candidato. Usa la pestaña correcta.');
        }

        // RBAC: empresa solo desde pestaña empresa
        if (role === 'EMPRESA' && loginType !== 'empresa') {
          throw new Error('Esta cuenta pertenece a una empresa. Usa la pestaña correcta.');
        }

        // Empresa debe estar verificada por admin
        if (role === 'EMPRESA') {
          if (!user.company) {
            throw new Error('Tu perfil de empresa no ha sido completado.');
          }
          if (!user.company.isVerified) {
            throw new Error('Tu empresa está pendiente de verificación por el administrador.');
          }
        }

        // SUPERADMIN puede entrar desde cualquier pestaña
        return {
          id:    user.id,
          email: user.email,
          name:  user.name ?? user.nombre ?? '',
          role:  user.role,
          empresaNombre: user.company?.nombre ?? null,
        };
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id             = user.id;
        token.role           = (user as any).role;
        token.empresaNombre  = (user as any).empresaNombre;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id            = token.id;
        (session.user as any).role          = token.role;
        (session.user as any).empresaNombre = token.empresaNombre;
      }
      return session;
    },
  },

  pages: { signIn: '/login', error: '/login' },
  secret: process.env.NEXTAUTH_SECRET,
};
