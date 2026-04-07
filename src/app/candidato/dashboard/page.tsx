'use client';

/**
 * CandidatoDashboardPage — Vista principal del módulo candidato (CAN-01).
 * Lógica:
 * - Muestra métricas en tarjetas con iconos lucide-react
 * - Tabla de postulaciones recientes con badges de estado por color
 * - Panel de alertas de empleo con Switches funcionales (estado local)
 * - Empleos recomendados con % de match
 */

import { useState } from 'react';
import {
  FileText,
  Eye,
  Bell,
  TrendingUp,
  Briefcase,
  Star,
  ArrowUpRight,
  CheckCircle2,
  TrendingDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const metricas = [
  {
    label: 'Solicitudes enviadas',
    value: '3',
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    trend: '+1 esta semana',
    trendUp: true,
  },
  {
    label: 'Visitas a tu perfil',
    value: '12',
    icon: Eye,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    trend: '+4 esta semana',
    trendUp: true,
  },
  {
    label: 'Alertas activas',
    value: '5',
    icon: Bell,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    trend: '2 sin revisar',
    trendUp: false,
  },
];

const solicitudesRecientes = [
  {
    empresa: 'Applaudo Studios',
    cargo: 'Frontend Developer',
    fecha: 'Hace 2 días',
    estado: 'En revisión',
    estadoColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    empresa: 'Banco Agrícola',
    cargo: 'UX Designer Senior',
    fecha: 'Hace 5 días',
    estado: 'Entrevista',
    estadoColor: 'bg-blue-100 text-blue-700',
  },
  {
    empresa: 'RIMAC Seguros',
    cargo: 'Product Manager',
    fecha: 'Hace 1 semana',
    estado: 'Descartado',
    estadoColor: 'bg-red-100 text-red-700',
  },
];

const empleosRecomendados = [
  { titulo: 'React Developer', empresa: 'Platzi', match: '92%' },
  { titulo: 'UI/UX Designer', empresa: 'Banbif', match: '87%' },
  { titulo: 'Product Designer', empresa: 'Tigo El Salvador', match: '81%' },
];

const alertasIniciales = [
  { id: 1, label: 'React Developer en San Salvador', descripcion: 'Tiempo completo · $1,800+', activa: true },
  { id: 2, label: 'UX Designer (Remoto)', descripcion: 'Remoto · Cualquier salario', activa: true },
  { id: 3, label: 'Product Manager Híbrido', descripcion: 'Híbrido · $2,800+', activa: false },
  { id: 4, label: 'Data Analyst Jr.', descripcion: 'Lima · Prácticas', activa: true },
];

export default function CandidatoDashboardPage() {
  // Estado local de alertas — en producción vendría del store/API
  const [alertas, setAlertas] = useState(alertasIniciales);

  const toggleAlerta = (id: number) => {
    setAlertas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, activa: !a.activa } : a))
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* ── Encabezado ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Bienvenido de vuelta 👋</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Aquí tienes un resumen de tu actividad reciente.
          </p>
        </div>
        <Link href="/candidato/busqueda">
          <Button size="sm" className="bg-[#1A56DB] hover:bg-[#1A56DB]/90 text-white gap-2 shadow-sm">
            <Briefcase className="h-4 w-4" />
            Buscar empleos
          </Button>
        </Link>
      </div>

      {/* ── Métricas ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metricas.map((m) => (
          <Card key={m.label} className="border border-gray-200 bg-white hover:shadow-sm transition-shadow">
            <CardContent className="pt-5 pb-5 px-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${m.bg}`}>
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                </div>
                {m.trendUp
                  ? <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  : <TrendingDown className="h-3.5 w-3.5 text-gray-400" />
                }
              </div>
              <p className="text-2xl font-bold text-[#111827]">{m.value}</p>
              <p className="text-xs font-medium text-gray-600 mt-0.5">{m.label}</p>
              <p className={`text-xs mt-1 ${m.trendUp ? 'text-emerald-600' : 'text-gray-400'}`}>
                {m.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Grid medio: Solicitudes + Recomendados ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Tabla de postulaciones recientes */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-200 bg-white h-full">
            <CardHeader className="pb-2 pt-5 px-5 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold text-[#111827]">
                Postulaciones Recientes
              </CardTitle>
              <Link href="/candidato/solicitudes">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-[#1A56DB] gap-1 px-2">
                  Ver todas <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {/* Tabla limpia */}
              <div className="w-full">
                <div className="grid grid-cols-3 text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-100">
                  <span>Empresa / Cargo</span>
                  <span className="text-center">Fecha</span>
                  <span className="text-right">Estado</span>
                </div>
                {solicitudesRecientes.map((s, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 items-center py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors rounded"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-[#1A56DB]/10 flex items-center justify-center text-[#1A56DB] font-bold text-xs shrink-0">
                        {s.empresa.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#111827] truncate">{s.cargo}</p>
                        <p className="text-xs text-gray-400 truncate">{s.empresa}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 text-center">{s.fecha}</span>
                    <div className="flex justify-end">
                      <Badge className={`text-xs font-medium border-0 ${s.estadoColor}`}>
                        {s.estado}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empleos recomendados */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader className="pb-2 pt-5 px-5">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#111827]">
              <Star className="h-4 w-4 text-yellow-500" />
              Recomendados para ti
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-3">
            {empleosRecomendados.map((e, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-[#111827]">{e.titulo}</p>
                  <p className="text-xs text-gray-400">{e.empresa}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {e.match}
                </div>
              </div>
            ))}
            <Link href="/candidato/busqueda">
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 h-8 text-xs text-[#1A56DB] border-[#1A56DB]/30 hover:bg-[#1A56DB]/5"
              >
                Ver más empleos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* ── Panel de Alertas de Empleo ─────────────────────────────── */}
      <Card className="border border-gray-200 bg-white">
        <CardHeader className="pb-3 pt-5 px-5 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#111827]">
              <Bell className="h-4 w-4 text-orange-500" />
              Alertas de Empleo
            </CardTitle>
            <p className="text-xs text-gray-400 mt-0.5">
              Activa las alertas que quieres recibir por correo
            </p>
          </div>
          <Link href="/candidato/alertas">
            <Button variant="ghost" size="sm" className="h-7 text-xs text-[#1A56DB] gap-1 px-2">
              Gestionar <ArrowUpRight className="h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <Separator />
        <CardContent className="px-5 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {alertas.map((alerta) => (
              <div
                key={alerta.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  alerta.activa
                    ? 'border-[#1A56DB]/20 bg-[#1A56DB]/3'
                    : 'border-gray-100 bg-gray-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-md ${alerta.activa ? 'bg-[#1A56DB]/10' : 'bg-gray-100'}`}>
                    <Bell className={`h-3.5 w-3.5 ${alerta.activa ? 'text-[#1A56DB]' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${alerta.activa ? 'text-[#111827]' : 'text-gray-400'}`}>
                      {alerta.label}
                    </p>
                    <p className="text-xs text-gray-400">{alerta.descripcion}</p>
                  </div>
                </div>
                {/* Switch funcional — alterna el estado activa/inactiva */}
                <Switch
                  checked={alerta.activa}
                  onCheckedChange={() => toggleAlerta(alerta.id)}
                  className="data-[state=checked]:bg-[#1A56DB]"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
