'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {
  Eye, EyeOff, LogIn, Briefcase, Star,
  Users, TrendingUp, Building2, CheckCircle,
  ArrowRight, AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

/* ─── Data ────────────────────────────────────────────────────────── */
const highlights = [
  { icon: Users,       label: '+10,000 vacantes activas' },
  { icon: TrendingUp,  label: '95% tasa de satisfacción' },
  { icon: Star,        label: '+500 empresas verificadas' },
];

/* ─── PasswordInput ───────────────────────────────────────────────── */
function PasswordInput({
  id, value, onChange,
}: {
  id: string; value: string; onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative w-full">
      <Input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="••••••••"
        autoComplete="current-password"
        className="w-full h-11 pr-11 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-[#1A56DB]"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? 'Ocultar' : 'Mostrar'}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

/* ─── LoginForm ───────────────────────────────────────────────────── */
function LoginForm({ type }: { type: 'candidato' | 'empresa' }) {
  const router    = useRouter();
  const isEmpresa = type === 'empresa';
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Completa todos los campos.'); return; }
    setLoading(true);
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) { setError('Correo o contraseña incorrectos.'); return; }
    router.push(isEmpresa ? '/empresa/dashboard' : '/candidato/dashboard');
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col space-y-4 w-full">
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col space-y-2 w-full">
        <Label htmlFor={`email-${type}`} className="text-sm font-medium text-slate-700">
          {isEmpresa ? 'Email corporativo' : 'Correo electrónico'}
        </Label>
        <Input
          id={`email-${type}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isEmpresa ? 'rrhh@empresa.com.sv' : 'tu@correo.com'}
          autoComplete="email"
          required
          className="w-full h-11 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-[#1A56DB]"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex items-center justify-between w-full">
          <Label htmlFor={`pwd-${type}`} className="text-sm font-medium text-slate-700">
            Contraseña
          </Label>
          <Link href="/recuperar" className="text-xs text-[#1A56DB] hover:underline underline-offset-2">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <PasswordInput id={`pwd-${type}`} value={password} onChange={setPassword} />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className={`w-full h-11 rounded-xl font-semibold text-sm disabled:opacity-60 ${
          isEmpresa ? 'bg-[#1A56DB] hover:bg-[#1440a8] text-white' : 'bg-[#10B981] hover:bg-[#059669] text-white'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Verificando...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <LogIn className="h-4 w-4" />
            {isEmpresa ? 'Entrar al panel empresarial' : 'Iniciar sesión'}
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </form>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */
export default function LoginPage() {
  const searchParams = useSearchParams();
  const defaultTab   = searchParams.get('type') === 'empresa' ? 'empresa' : 'candidato';

  return (
    <div className="min-h-screen w-full flex bg-white">

      {/* COLUMNA IZQUIERDA (AZUL) - Solo en Desktop */}
      <div className="hidden lg:flex w-1/2 bg-[#1A56DB] p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Blobs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lgrid)" />
        </svg>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">IntegraJobs</span>
        </div>

        {/* Copy */}
        <div className="relative space-y-8">
          <div>
            <h2 className="text-3xl xl:text-4xl font-black leading-tight mb-4">
              Tu próxima oportunidad te está esperando
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed max-w-sm">
              Miles de empleos. Cientos de empresas. Una plataforma diseñada para impulsar tu carrera en El Salvador.
            </p>
          </div>
          <ul className="space-y-3">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-blue-100 font-medium">{label}</span>
              </li>
            ))}
          </ul>
          <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map((s) => <Star key={s} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-sm text-blue-100 italic leading-relaxed mb-4">
              "Encontré mi trabajo ideal en menos de 2 semanas. IntegraJobs conecta talento con las mejores empresas del país."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">MG</div>
              <div>
                <p className="text-xs font-semibold text-white">María García</p>
                <p className="text-xs text-blue-300">UX Designer · Banco Agrícola</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-blue-400">© 2026 IntegraJobs · El Salvador</p>
      </div>

      {/* COLUMNA DERECHA (BLANCA) - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">

        {/* CONTENEDOR DEL FORMULARIO (MÁXIMO ANCHO MD, APILADO VERTICAL) */}
        <div className="w-full max-w-md flex flex-col space-y-8">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#1A56DB] flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-base">IntegraJobs</span>
          </div>

          {/* HEADER DEL FORM */}
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900">Iniciar sesión</h1>
            <p className="text-slate-500">Accede a tu cuenta para continuar</p>
          </div>

          {/* TABS Y FORMULARIO */}
          <Tabs defaultValue={defaultTab} className="w-full flex flex-col space-y-6">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="candidato" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Candidato
              </TabsTrigger>
              <TabsTrigger value="empresa" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Empresa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="candidato" className="mt-0">
              <LoginForm type="candidato" />
            </TabsContent>
            <TabsContent value="empresa" className="mt-0">
              <LoginForm type="empresa" />
            </TabsContent>
          </Tabs>

          {/* SEPARADOR Y REGISTRO */}
          <div className="flex flex-col space-y-6 w-full">
            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs text-slate-500 whitespace-nowrap">
                ¿No tienes cuenta?
              </span>
            </div>
            <Link href="/registro" className="w-full">
              <Button variant="outline" className="w-full h-11 rounded-xl font-semibold text-sm border-slate-200 hover:border-[#1A56DB]/50 hover:text-[#1A56DB]">
                <CheckCircle className="h-4 w-4 text-[#10B981] mr-2" />
                Regístrate gratis aquí
              </Button>
            </Link>
          </div>

          <p className="text-center text-xs text-slate-400">
            Plataforma líder de empleos en <span className="text-slate-600 font-medium">El Salvador</span> · Sin costo para candidatos
          </p>

        </div>
      </div>
    </div>
  );
}
