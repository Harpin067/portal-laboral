import Link from 'next/link';
import { Search, Building2, ArrowRight, CheckCircle, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const candidatoPerks = [
  'Acceso a +10,000 vacantes activas',
  'Alertas de empleo personalizadas',
  'Perfil y CV en minutos',
];

const empresaPerks = [
  'Publica vacantes ilimitadas',
  'ATS integrado sin costo adicional',
  'Acceso a candidatos verificados',
];

export default function RegistroGatewayPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10">
        <div className="w-9 h-9 rounded-xl bg-[#1A56DB] flex items-center justify-center">
          <Briefcase className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold text-slate-900">IntegraJobs</span>
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">¿Cómo quieres unirte?</h1>
        <p className="text-sm text-slate-500">Elige tu perfil para comenzar. Es gratis y toma menos de 2 minutos.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 w-full max-w-2xl">
        {/* Candidato */}
        <Link href="/registro/candidato">
          <div className="group h-full bg-white border-2 border-slate-200 hover:border-[#10B981] rounded-3xl p-7 flex flex-col gap-4 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-100/60 cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <Search className="h-7 w-7 text-[#10B981]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#10B981] uppercase tracking-wide mb-1">Para candidatos</p>
              <h2 className="text-xl font-black text-slate-900 leading-tight mb-2">
                Estoy buscando empleo
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Crea tu perfil y aplica a miles de vacantes verificadas en minutos.
              </p>
            </div>
            <ul className="space-y-2 mt-auto">
              {candidatoPerks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-semibold gap-2 rounded-xl h-11 mt-2">
              Soy Candidato <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Link>

        {/* Empresa */}
        <Link href="/registro/empresa">
          <div className="group h-full bg-white border-2 border-slate-200 hover:border-[#1A56DB] rounded-3xl p-7 flex flex-col gap-4 transition-all duration-200 hover:shadow-lg hover:shadow-blue-100/60 cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Building2 className="h-7 w-7 text-[#1A56DB]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1A56DB] uppercase tracking-wide mb-1">Para empresas</p>
              <h2 className="text-xl font-black text-slate-900 leading-tight mb-2">
                Quiero contratar talento
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Publica vacantes y gestiona tu proceso de selección en un solo lugar.
              </p>
            </div>
            <ul className="space-y-2 mt-auto">
              {empresaPerks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle className="h-3.5 w-3.5 text-[#1A56DB] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <Button className="w-full bg-[#1A56DB] hover:bg-[#1440a8] text-white font-semibold gap-2 rounded-xl h-11 mt-2">
              Soy Empresa <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Link>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-[#1A56DB] hover:underline font-medium">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}
