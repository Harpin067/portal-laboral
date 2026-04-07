import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Job } from '@/lib/mock-jobs';

export default function JobCard({ job }: { job: Job }) {
  const modalidadColor =
    job.modalidad === 'Remoto'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : job.modalidad === 'Híbrido'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-slate-50 text-slate-600 border-slate-200';

  return (
    <Link href={`/empleos/${job.id}`}>
      <Card className="h-full border border-slate-100 bg-white hover:border-[#1A56DB]/30 hover:shadow-md transition-all duration-200 cursor-pointer rounded-2xl">
        <CardContent className="p-5 flex flex-col gap-3 h-full">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A56DB]/10 flex items-center justify-center font-bold text-[#1A56DB] text-sm shrink-0">
              {job.logo}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 leading-tight truncate">{job.titulo}</p>
              <p className="text-xs text-slate-400 mt-0.5">{job.empresa}</p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3 w-3 shrink-0" />
              {job.ubicacion}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${modalidadColor}`}>
              {job.modalidad}
            </span>
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-slate-800">{job.salario}</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-[#1A56DB]/10 text-[#1A56DB] border-0 rounded-lg">
                {job.tag}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            {job.publicado}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
