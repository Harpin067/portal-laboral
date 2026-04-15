'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Search, X } from 'lucide-react';

export function EmpleosFilters({ defaultQ, defaultLoc }: { defaultQ?: string; defaultLoc?: string }) {
  const router   = useRouter();
  const qRef     = useRef<HTMLInputElement>(null);
  const locRef   = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    const q   = qRef.current?.value.trim() ?? '';
    const loc = locRef.current?.value.trim() ?? '';
    if (q)   params.set('q', q);
    if (loc) params.set('loc', loc);
    router.push(`/empleos${params.toString() ? `?${params}` : ''}`);
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-xl">
      <div className="flex-1 flex items-center gap-3 px-5 py-3.5">
        <Search className="h-4 w-4 text-slate-400 shrink-0" />
        <input
          ref={qRef}
          type="text"
          defaultValue={defaultQ ?? ''}
          placeholder="Cargo, empresa o habilidad..."
          className="flex-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
        />
      </div>
      <div className="hidden sm:block w-px bg-slate-200 my-2" />
      <div className="flex-1 flex items-center gap-3 px-5 py-3.5">
        <Search className="h-4 w-4 text-slate-400 shrink-0" />
        <input
          ref={locRef}
          type="text"
          defaultValue={defaultLoc ?? ''}
          placeholder="Ciudad o remoto..."
          className="flex-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto bg-[#10B981] hover:bg-[#059669] transition-colors text-white font-semibold text-sm px-8 py-3.5 cursor-pointer"
      >
        Buscar
      </button>
    </form>
  );
}
