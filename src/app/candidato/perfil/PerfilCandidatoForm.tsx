'use client';

import { useTransition, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { actualizarPerfilCandidato } from '@/actions/perfil';

export function PerfilCandidatoForm({ profile }: { profile: any }) {
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(false);
    const fd = new FormData(e.currentTarget);
    start(async () => {
      await actualizarPerfilCandidato(fd);
      setSaved(true);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-700">Nombre</Label>
          <Input name="nombre" defaultValue={profile?.nombre ?? ''} className="h-9 text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-700">Apellidos</Label>
          <Input name="apellidos" defaultValue={profile?.apellidos ?? ''} className="h-9 text-sm" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-gray-700">Email</Label>
        <Input value={profile?.email ?? ''} disabled className="h-9 text-sm bg-gray-50" />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-gray-700">Teléfono</Label>
        <Input name="telefono" defaultValue={profile?.telefono ?? ''} placeholder="+503 7000-0000" className="h-9 text-sm" />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending} className="bg-[#1A56DB] hover:bg-[#1A56DB]/90 text-white gap-2 min-w-[140px]">
          {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Guardando...</> : 'Guardar cambios'}
        </Button>
        {saved && (
          <span className="flex items-center gap-1 text-xs text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" /> Guardado
          </span>
        )}
      </div>
    </form>
  );
}
