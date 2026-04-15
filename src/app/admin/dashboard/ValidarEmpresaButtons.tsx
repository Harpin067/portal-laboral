'use client';

import { useTransition } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { validarEmpresa } from '@/actions/admin';

export function ValidarEmpresaButtons({ companyId }: { companyId: string }) {
  const [pending, start] = useTransition();

  function handle(decision: 'APPROVED' | 'REJECTED') {
    start(async () => {
      await validarEmpresa(companyId, decision);
    });
  }

  if (pending) {
    return <Loader2 className="h-4 w-4 animate-spin text-gray-400" />;
  }

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <Button
        size="sm"
        onClick={() => handle('APPROVED')}
        className="h-7 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
      >
        <CheckCircle2 className="h-3.5 w-3.5" /> Aprobar
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handle('REJECTED')}
        className="h-7 px-2.5 text-xs text-red-600 border-red-200 hover:bg-red-50 gap-1"
      >
        <XCircle className="h-3.5 w-3.5" /> Rechazar
      </Button>
    </div>
  );
}
