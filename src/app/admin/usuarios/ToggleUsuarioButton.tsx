'use client';

import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toggleUsuarioActivo } from '@/actions/admin';

export function ToggleUsuarioButton({ userId, isActive }: { userId: string; isActive: boolean }) {
  const [pending, start] = useTransition();

  function toggle() {
    start(async () => {
      await toggleUsuarioActivo(userId, !isActive);
    });
  }

  if (pending) return <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-400" />;

  return (
    <button onClick={toggle} className="cursor-pointer">
      <Badge className={`text-xs border-0 ${isActive ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-red-50 text-red-600 hover:bg-red-100'} transition-colors`}>
        {isActive ? 'Activo' : 'Inactivo'}
      </Badge>
    </button>
  );
}
