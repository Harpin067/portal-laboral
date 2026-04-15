'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Building2, Briefcase, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registrarEmpresa } from '@/actions/registro';

export default function RegistroEmpresaPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]     = useState('');
  const [pending, start]      = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const fd = new FormData(e.currentTarget);
    if (!fd.get('empresa') || !fd.get('email') || !fd.get('password')) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    if ((fd.get('password') as string).length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    start(async () => {
      try { await registrarEmpresa(fd); }
      catch (err: any) { setError(err.message ?? 'Error al registrar.'); }
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-[#1A56DB] flex items-center justify-center">
          <Briefcase className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold text-slate-900">IntegraJobs</span>
      </Link>

      <div className="w-full max-w-md">
        <Link href="/registro" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#1A56DB] mb-4 transition-colors">
          <ArrowLeft className="h-3 w-3" /> Cambiar tipo de cuenta
        </Link>

        <Card className="border border-slate-200 shadow-lg shadow-slate-200/40 rounded-2xl bg-white">
          <CardHeader className="pb-4 pt-7 px-7">
            <CardTitle className="text-xl font-black text-slate-900">Registrar empresa</CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Accede al talento que necesitas en El Salvador
            </CardDescription>
          </CardHeader>
          <CardContent className="px-7 pb-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="empresa" className="text-xs font-medium text-gray-700">Nombre de la empresa *</Label>
                <Input id="empresa" name="empresa" placeholder="Ej. Applaudo Studios" required className="h-10 text-sm border-gray-200 focus-visible:ring-[#1A56DB]" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="industria" className="text-xs font-medium text-gray-700">Industria</Label>
                <select id="industria" name="industria" defaultValue="Tecnología" className="flex h-10 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A56DB]">
                  <option value="Tecnología">Tecnología</option>
                  <option value="Finanzas">Finanzas</option>
                  <option value="Salud">Salud</option>
                  <option value="Educación">Educación</option>
                  <option value="Retail">Retail</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Manufactura">Manufactura</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium text-gray-700">Email corporativo *</Label>
                <Input id="email" name="email" type="email" placeholder="rrhh@empresa.com.sv" required className="h-10 text-sm border-gray-200 focus-visible:ring-[#1A56DB]" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-medium text-gray-700">Contraseña *</Label>
                <div className="relative">
                  <Input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Mínimo 8 caracteres" required minLength={8} className="h-10 text-sm border-gray-200 focus-visible:ring-[#1A56DB] pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer" aria-label="Mostrar contraseña">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-700">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Tu empresa será revisada por un administrador antes de poder publicar vacantes.</span>
              </div>

              <Button type="submit" disabled={pending} className="w-full h-10 bg-[#1A56DB] hover:bg-[#1440a8] text-white font-semibold gap-2 rounded-xl disabled:opacity-60">
                {pending ? 'Registrando...' : <><Building2 className="h-4 w-4" /> Registrar empresa</>}
              </Button>

              <p className="text-center text-xs text-gray-500">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login?type=empresa" className="text-[#1A56DB] hover:underline font-medium">Iniciar sesión aquí</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
