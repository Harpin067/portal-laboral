'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, Building2, Briefcase, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegistroEmpresaPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
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
              Accede al talento que necesitas para hacer crecer tu equipo
            </CardDescription>
          </CardHeader>
          <CardContent className="px-7 pb-7 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="empresa" className="text-xs font-medium text-gray-700">Nombre de la empresa</Label>
              <Input id="empresa" placeholder="Ej. Tecnología SAC" className="h-10 text-sm border-gray-200 focus-visible:ring-[#1A56DB]" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ruc" className="text-xs font-medium text-gray-700">RUC (opcional)</Label>
              <Input id="ruc" placeholder="20xxxxxxxxx" className="h-10 text-sm border-gray-200 focus-visible:ring-[#1A56DB]" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-gray-700">Email corporativo</Label>
              <Input id="email" type="email" placeholder="rrhh@empresa.com" className="h-10 text-sm border-gray-200 focus-visible:ring-[#1A56DB]" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium text-gray-700">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  className="h-10 text-sm border-gray-200 focus-visible:ring-[#1A56DB] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  aria-label="Mostrar contraseña"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Al registrarte aceptas nuestros{' '}
              <span className="text-[#1A56DB] hover:underline cursor-pointer">Términos de Servicio</span>{' '}
              y{' '}
              <span className="text-[#1A56DB] hover:underline cursor-pointer">Política de Privacidad</span>.
            </p>

            <Button className="w-full h-10 bg-[#1A56DB] hover:bg-[#1440a8] text-white font-semibold gap-2 rounded-xl">
              <Building2 className="h-4 w-4" /> Registrar empresa
            </Button>

            <p className="text-center text-xs text-gray-500">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login?type=empresa" className="text-[#1A56DB] hover:underline font-medium">
                Iniciar sesión aquí
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
