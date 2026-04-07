'use client';

/**
 * CAN-JobCard — Tarjeta de oferta laboral (CAN-02 / CAN-03).
 * Lógica:
 * - Hover: sombra elevada + borde primario + título cambia a color primario
 * - Badge de modalidad: color semántico (Remoto=verde, Híbrido=azul, Presencial=naranja)
 * - Badge de tipo de contrato: color diferenciado por tipo
 * - Botón "Guardar" cambia de estado visual (icono relleno + color) al hacer click
 * - Botón "Aplicar" usa color secundario (#10B981) para máximo contraste visual
 */

import { MapPin, Clock, Bookmark, BookmarkCheck, Building2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCandidatoStore } from '@/stores/candidatoStore';
import { cn } from '@/lib/utils';

export interface Job {
  id: string;
  titulo: string;
  empresa: string;
  ubicacion: string;
  modalidad: 'Presencial' | 'Remoto' | 'Híbrido';
  tipoContrato: string;
  salario?: string;
  tags: string[];
  postedAt: string;
  logoColor?: string;
}

interface CAN_JobCardProps {
  job: Job;
}

// Colores semánticos por modalidad
const modalidadColor: Record<string, string> = {
  Remoto: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Híbrido: 'bg-blue-100 text-blue-700 border-blue-200',
  Presencial: 'bg-orange-100 text-orange-700 border-orange-200',
};

// Colores semánticos por tipo de contrato
const contratoColor: Record<string, string> = {
  'Tiempo completo': 'bg-[#1A56DB]/10 text-[#1A56DB] border-[#1A56DB]/20',
  'Medio tiempo': 'bg-purple-100 text-purple-700 border-purple-200',
  'Freelance': 'bg-teal-100 text-teal-700 border-teal-200',
  'Prácticas': 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

export default function CAN_JobCard({ job }: CAN_JobCardProps) {
  const { trabajosGuardados, toggleGuardarTrabajo } = useCandidatoStore();
  const guardado = trabajosGuardados.includes(job.id);

  return (
    <Card
      className={cn(
        'group transition-all duration-200 border bg-white cursor-pointer',
        'hover:shadow-lg hover:border-[#1A56DB]/30 hover:-translate-y-0.5'
      )}
    >
      <CardContent className="pt-5 pb-3 px-5">

        {/* ── Header: Logo + Título + Badge modalidad ──────────────── */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-sm"
            style={{ backgroundColor: job.logoColor ?? '#1A56DB' }}
          >
            {job.empresa.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[#111827] text-sm leading-tight truncate group-hover:text-[#1A56DB] transition-colors">
              {job.titulo}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Building2 className="h-3 w-3 text-gray-400 shrink-0" />
              <span className="text-xs text-gray-500 truncate">{job.empresa}</span>
            </div>
          </div>

          <Badge
            variant="outline"
            className={cn('text-xs shrink-0 font-medium', modalidadColor[job.modalidad])}
          >
            {job.modalidad}
          </Badge>
        </div>

        {/* ── Meta: Ubicación + Tipo de contrato + Salario ─────────── */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job.ubicacion}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {job.tipoContrato}
          </span>
        </div>

        {/* ── Badges: tipo contrato + salario ──────────────────────── */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <Badge
            variant="outline"
            className={cn('text-xs font-medium', contratoColor[job.tipoContrato] ?? 'bg-gray-100 text-gray-600')}
          >
            {job.tipoContrato}
          </Badge>
          {job.salario && (
            <Badge variant="outline" className="text-xs font-semibold text-[#111827] border-gray-200 bg-gray-50">
              {job.salario}
            </Badge>
          )}
        </div>

        {/* ── Tags de skills ────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-1.5">
          {job.tags.slice(0, 4).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-gray-100 text-gray-600 hover:bg-[#1A56DB]/10 hover:text-[#1A56DB] border-0 transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {job.tags.length > 4 && (
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-400 border-0">
              +{job.tags.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-4 pt-2 flex items-center justify-between border-t border-gray-50">
        <span className="text-xs text-gray-400">{job.postedAt}</span>

        <div className="flex items-center gap-1.5">
          {/* Botón Guardar — cambia estado visual al hacer click */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8 transition-colors',
              guardado
                ? 'text-[#1A56DB] bg-[#1A56DB]/8 hover:bg-[#1A56DB]/15'
                : 'text-gray-400 hover:text-[#1A56DB] hover:bg-[#1A56DB]/8'
            )}
            onClick={() => toggleGuardarTrabajo(job.id)}
            aria-label={guardado ? 'Quitar de guardados' : 'Guardar trabajo'}
          >
            {guardado ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>

          {/* Botón Ver detalles */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-[#1A56DB] hover:bg-[#1A56DB]/8"
            aria-label="Ver detalles"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>

          {/* Botón Aplicar */}
          <Button
            size="sm"
            className="h-8 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-medium shadow-sm transition-all hover:shadow-md"
          >
            Aplicar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
