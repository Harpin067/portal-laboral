'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import JobCard from '@/components/shared/JobCard';
import { MOCK_JOBS, CATEGORIAS_META } from '@/lib/mock-jobs';

const MODALIDADES = ['Todos', 'Remoto', 'Híbrido', 'Presencial'] as const;

export default function EmpleosPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [location, setLocation] = useState(searchParams.get('loc') ?? '');
  const [modalidad, setModalidad] = useState('Todos');
  const [categoriaFilter, setCategoriaFilter] = useState('');

  const filtered = useMemo(() => {
    return MOCK_JOBS.filter((j) => {
      const matchQ =
        !query ||
        j.titulo.toLowerCase().includes(query.toLowerCase()) ||
        j.empresa.toLowerCase().includes(query.toLowerCase()) ||
        j.tag.toLowerCase().includes(query.toLowerCase());
      const matchLoc =
        !location || j.ubicacion.toLowerCase().includes(location.toLowerCase()) || j.modalidad === 'Remoto';
      const matchMod = modalidad === 'Todos' || j.modalidad === modalidad;
      const matchCat = !categoriaFilter || j.categoriaSlug === categoriaFilter;
      return matchQ && matchLoc && matchMod && matchCat;
    });
  }, [query, location, modalidad, categoriaFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Search header */}
      <div className="bg-gradient-to-br from-[#0f2d6b] via-[#1A56DB] to-[#1e6fb8] pt-8 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1">Explorar empleos</h1>
          <p className="text-blue-200 text-sm mb-6">{MOCK_JOBS.length} vacantes publicadas hoy</p>
          <div className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="flex-1 flex items-center gap-3 px-5 py-3.5">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cargo, empresa o habilidad..."
                className="flex-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="hidden sm:block w-px bg-slate-200 my-2" />
            <div className="flex-1 flex items-center gap-3 px-5 py-3.5">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ciudad o remoto..."
                className="flex-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filtrar:
          </div>
          <div className="flex flex-wrap gap-2">
            {MODALIDADES.map((m) => (
              <button
                key={m}
                onClick={() => setModalidad(m)}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors cursor-pointer ${
                  modalidad === m
                    ? 'bg-[#1A56DB] text-white border-[#1A56DB]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#1A56DB]/40 hover:text-[#1A56DB]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORIAS_META).map(([slug, meta]) => (
              <button
                key={slug}
                onClick={() => setCategoriaFilter(categoriaFilter === slug ? '' : slug)}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors cursor-pointer ${
                  categoriaFilter === slug
                    ? `${meta.color} ring-1 ring-current`
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {meta.label}
              </button>
            ))}
          </div>
          {(query || location || modalidad !== 'Todos' || categoriaFilter) && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-slate-500 hover:text-red-500 gap-1 cursor-pointer"
              onClick={() => { setQuery(''); setLocation(''); setModalidad('Todos'); setCategoriaFilter(''); }}
            >
              <X className="h-3 w-3" /> Limpiar
            </Button>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-800">{filtered.length}</span> vacante{filtered.length !== 1 && 's'} encontrada{filtered.length !== 1 && 's'}
          </p>
          {query && (
            <Badge variant="secondary" className="text-xs bg-blue-50 text-[#1A56DB] border-blue-100">
              &ldquo;{query}&rdquo;
            </Badge>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500">No encontramos vacantes con esos filtros.</p>
            <p className="text-xs text-slate-400 mt-1">Intenta con otros términos o elimina filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
