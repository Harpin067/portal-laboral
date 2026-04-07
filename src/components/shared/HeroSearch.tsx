'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function HeroSearch() {
  const router = useRouter();
  const queryRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = queryRef.current?.value.trim() ?? '';
    const loc = locationRef.current?.value.trim() ?? '';
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (loc) params.set('loc', loc);
    router.push(`/empleos${params.toString() ? `?${params}` : ''}`);
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-5">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-2xl shadow-blue-900/30 overflow-hidden border border-white/20">
          <div className="flex-1 flex items-center gap-3 px-5 py-4">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              ref={queryRef}
              type="text"
              placeholder="Cargo, empresa o habilidad..."
              className="flex-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
            />
          </div>
          <div className="hidden sm:flex items-center">
            <Separator orientation="vertical" className="h-8 bg-slate-200" />
          </div>
          <div className="flex-1 flex items-center gap-3 px-5 py-4">
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              ref={locationRef}
              type="text"
              placeholder="Ciudad o remoto..."
              className="flex-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] transition-colors text-white font-semibold text-sm px-8 py-4 sm:rounded-r-2xl cursor-pointer"
          >
            Buscar
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mt-3.5 justify-center">
        {['React Developer', 'UX Designer', 'Backend Engineer', 'Product Manager'].map((term) => (
          <Link key={term} href={`/empleos?q=${encodeURIComponent(term)}`}>
            <span className="text-xs text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full cursor-pointer transition-colors">
              {term}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
