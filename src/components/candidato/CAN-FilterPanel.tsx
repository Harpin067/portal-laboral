'use client';

/**
 * CAN-FilterPanel — Panel de filtros profesional para búsqueda de empleo (CAN-02).
 * Lógica:
 * - Slider nativo de rango salarial (HTML input[type=range])
 * - Selects controlados para ubicación, modalidad y tipo de contrato
 * - Estado se sincroniza con candidatoStore (Zustand)
 * - Botón "Limpiar filtros" resetea todos los campos
 */

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCandidatoStore } from '@/stores/candidatoStore';

const SALARY_MIN = 0;
const SALARY_MAX = 15000;

export default function CAN_FilterPanel() {
  const { filtros, setFiltros } = useCandidatoStore();

  // Salary range — estado local para el slider (en soles)
  const [salarioMin, setSalarioMin] = useState(1500);
  const [salarioMax, setSalarioMax] = useState(10000);

  const limpiar = () => {
    setFiltros({ ubicacion: '', tipoTrabajo: '', modalidad: '' });
    setSalarioMin(1500);
    setSalarioMax(10000);
  };

  const hayFiltros =
    filtros.ubicacion || filtros.tipoTrabajo || filtros.modalidad ||
    salarioMin !== 1500 || salarioMax !== 10000;

  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-3 pt-5 px-5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#111827]">
            <SlidersHorizontal className="h-4 w-4 text-[#1A56DB]" />
            Filtros
          </CardTitle>
          {hayFiltros && (
            <button
              onClick={limpiar}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="h-3 w-3" /> Limpiar
            </button>
          )}
        </div>
        {hayFiltros && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {filtros.modalidad && (
              <Badge className="text-xs bg-[#1A56DB]/10 text-[#1A56DB] border-0 gap-1">
                {filtros.modalidad}
                <button onClick={() => setFiltros({ modalidad: '' })} className="hover:text-red-500">
                  <X className="h-2.5 w-2.5" />
                </button>
              </Badge>
            )}
            {filtros.tipoTrabajo && (
              <Badge className="text-xs bg-[#1A56DB]/10 text-[#1A56DB] border-0 gap-1">
                {filtros.tipoTrabajo}
                <button onClick={() => setFiltros({ tipoTrabajo: '' })} className="hover:text-red-500">
                  <X className="h-2.5 w-2.5" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <Separator />

      <CardContent className="px-5 pb-5 pt-4 space-y-5">

        {/* Palabra Clave */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600">Palabra Clave</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Cargo, empresa o skill..."
              className="pl-8 h-9 text-sm border-gray-200 focus-visible:ring-[#1A56DB]"
              defaultValue={filtros.ubicacion}
              onChange={(e) => setFiltros({ ubicacion: e.target.value })}
            />
          </div>
        </div>

        {/* Ubicación */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600">Ubicación</label>
          <Select
            value={filtros.ubicacion || null}
            onValueChange={(val) => setFiltros({ ubicacion: val ?? '' })}
          >
            <SelectTrigger className="h-9 text-sm border-gray-200 focus:ring-[#1A56DB]">
              <SelectValue placeholder="Todas las ciudades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lima">Lima</SelectItem>
              <SelectItem value="arequipa">Arequipa</SelectItem>
              <SelectItem value="trujillo">Trujillo</SelectItem>
              <SelectItem value="cusco">Cusco</SelectItem>
              <SelectItem value="remoto">Remoto (cualquier lugar)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Modalidad */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600">Modalidad</label>
          <Select
            value={filtros.modalidad || null}
            onValueChange={(val) => setFiltros({ modalidad: val ?? '' })}
          >
            <SelectTrigger className="h-9 text-sm border-gray-200 focus:ring-[#1A56DB]">
              <SelectValue placeholder="Todas las modalidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="presencial">Presencial</SelectItem>
              <SelectItem value="remoto">Remoto</SelectItem>
              <SelectItem value="hibrido">Híbrido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tipo de contrato */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600">Tipo de Contrato</label>
          <Select
            value={filtros.tipoTrabajo || null}
            onValueChange={(val) => setFiltros({ tipoTrabajo: val ?? '' })}
          >
            <SelectTrigger className="h-9 text-sm border-gray-200 focus:ring-[#1A56DB]">
              <SelectValue placeholder="Todos los tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Tiempo completo</SelectItem>
              <SelectItem value="part-time">Medio tiempo</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="practicas">Prácticas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rango Salarial — Slider dual */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-600">Rango Salarial (USD)</label>
            <span className="text-xs font-semibold text-[#1A56DB]">
              {salarioMin.toLocaleString()} – {salarioMax.toLocaleString()}
            </span>
          </div>
          {/* Slider mínimo */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Mín.</span>
              <span>$ {salarioMin.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={SALARY_MIN}
              max={SALARY_MAX}
              step={500}
              value={salarioMin}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val < salarioMax) setSalarioMin(val);
              }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1A56DB]"
            />
          </div>
          {/* Slider máximo */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Máx.</span>
              <span>$ {salarioMax.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={SALARY_MIN}
              max={SALARY_MAX}
              step={500}
              value={salarioMax}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val > salarioMin) setSalarioMax(val);
              }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1A56DB]"
            />
          </div>
        </div>

        <div className="pt-1 flex flex-col gap-2">
          <Button className="w-full h-9 bg-[#1A56DB] hover:bg-[#1A56DB]/90 text-white text-sm font-medium shadow-sm">
            Aplicar Filtros
          </Button>
          {hayFiltros && (
            <Button
              variant="ghost"
              className="w-full h-9 text-sm text-gray-500 hover:text-gray-700"
              onClick={limpiar}
            >
              Limpiar todos
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
