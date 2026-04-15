'use client';

/**
 * NuevaVacantePage — Formulario para publicar una vacante en IntegraJobs.
 * Conectado al Server Action crearVacante via useTransition para estado de carga.
 */

import { useTransition, useRef } from 'react';
import { crearVacante } from '@/actions/vacantes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Briefcase, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NuevaVacantePage() {
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await crearVacante(formData);
    });
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Encabezado */}
      <div className="flex items-center gap-3">
        <Link href="/empresa/dashboard">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-[#1A56DB]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Publicar nueva oportunidad</h1>
          <p className="text-sm text-gray-500">
            Completa la información para atraer al mejor talento de El Salvador.
          </p>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

        {/* Datos del puesto */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-[#111827]">
              Datos del Puesto
            </CardTitle>
            <CardDescription className="text-xs">
              Información principal que verán los candidatos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Título */}
            <div className="space-y-1.5">
              <Label htmlFor="titulo" className="text-xs font-medium text-gray-700">
                Título del puesto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="titulo"
                name="titulo"
                placeholder="Ej. Frontend Developer React"
                required
                disabled={pending}
                className="h-9 text-sm"
              />
            </div>

            {/* Ubicación */}
            <div className="space-y-1.5">
              <Label htmlFor="ubicacion" className="text-xs font-medium text-gray-700">
                Ubicación <span className="text-red-500">*</span>
              </Label>
              <select
                id="ubicacion"
                name="ubicacion"
                required
                disabled={pending}
                defaultValue=""
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
              >
                <option value="" disabled>Selecciona ciudad</option>
                <option value="San Salvador">San Salvador</option>
                <option value="Santa Tecla">Santa Tecla</option>
                <option value="Antiguo Cuscatlán">Antiguo Cuscatlán</option>
                <option value="San Miguel">San Miguel</option>
                <option value="Santa Ana">Santa Ana</option>
                <option value="Soyapango">Soyapango</option>
                <option value="Mejicanos">Mejicanos</option>
                <option value="Remoto">Remoto</option>
              </select>
            </div>

            {/* Tipo + Contrato */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="modalidad" className="text-xs font-medium text-gray-700">
                  Modalidad <span className="text-red-500">*</span>
                </Label>
                <select
                  id="modalidad"
                  name="modalidad"
                  required
                  disabled={pending}
                  defaultValue=""
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
                >
                  <option value="" disabled>Selecciona tipo</option>
                  <option value="presencial">Presencial</option>
                  <option value="hibrido">Híbrido</option>
                  <option value="remoto">Remoto</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tipoContrato" className="text-xs font-medium text-gray-700">
                  Tipo de contrato <span className="text-red-500">*</span>
                </Label>
                <select
                  id="tipoContrato"
                  name="tipoContrato"
                  required
                  disabled={pending}
                  defaultValue=""
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
                >
                  <option value="" disabled>Selecciona contrato</option>
                  <option value="completo">Tiempo completo</option>
                  <option value="medio">Medio tiempo</option>
                  <option value="temporal">Temporal</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
            </div>

            {/* Salario */}
            <div className="space-y-1.5">
              <Label htmlFor="salario" className="text-xs font-medium text-gray-700">
                Salario (USD)
              </Label>
              <Input
                id="salario"
                name="salario"
                placeholder="Ej. $1,000 - $1,500"
                disabled={pending}
                className="h-9 text-sm"
              />
            </div>

            {/* Experiencia */}
            <div className="space-y-1.5">
              <Label htmlFor="experiencia" className="text-xs font-medium text-gray-700">
                Nivel de experiencia <span className="text-red-500">*</span>
              </Label>
              <select
                id="experiencia"
                name="experiencia"
                required
                disabled={pending}
                defaultValue=""
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
              >
                <option value="" disabled>Selecciona nivel</option>
                <option value="junior">Junior (0-2 años)</option>
                <option value="mid">Mid (2-5 años)</option>
                <option value="senior">Senior (5+ años)</option>
                <option value="lead">Lead / Manager</option>
              </select>
            </div>

            {/* Contacto */}
            <div className="space-y-1.5">
              <Label htmlFor="contacto" className="text-xs font-medium text-gray-700">
                Email de contacto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contacto"
                name="contacto"
                type="email"
                placeholder="rrhh@tuempresa.com"
                required
                disabled={pending}
                className="h-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Descripción */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-[#111827]">
              Descripción
            </CardTitle>
            <CardDescription className="text-xs">
              Detalla responsabilidades, requisitos y beneficios del puesto.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="descripcion" className="text-xs font-medium text-gray-700">
                Descripción del puesto <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                placeholder="Describe las responsabilidades, beneficios, cultura de la empresa..."
                rows={5}
                required
                disabled={pending}
                className="text-sm resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="requisitos" className="text-xs font-medium text-gray-700">
                Requisitos y habilidades
              </Label>
              <Textarea
                id="requisitos"
                name="requisitos"
                placeholder="Ej. 3 años con React, inglés intermedio, TypeScript..."
                rows={3}
                disabled={pending}
                className="text-sm resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Acciones */}
        <div className="flex items-center justify-between pb-4">
          <Link href="/empresa/dashboard">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={pending}
              className="gap-2 text-gray-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={pending}
            className="bg-[#1A56DB] hover:bg-[#1A56DB]/90 text-white gap-2 min-w-[160px]"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Publicando...
              </>
            ) : (
              <>
                <Briefcase className="h-4 w-4" />
                Publicar
              </>
            )}
          </Button>
        </div>

      </form>
    </div>
  );
}
