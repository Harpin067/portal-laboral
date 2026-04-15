'use client';

import { useTransition, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { actualizarPerfilEmpresa } from '@/actions/perfil';

export function PerfilEmpresaForm({ company }: { company: any }) {
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(false);
    const fd = new FormData(e.currentTarget);
    start(async () => {
      await actualizarPerfilEmpresa(fd);
      setSaved(true);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Badge className={`text-xs ${company?.isVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-yellow-50 text-yellow-700'} border-0 gap-1`}>
          <ShieldCheck className="h-3 w-3" />
          {company?.isVerified ? 'Verificada' : 'Pendiente de verificación'}
        </Badge>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-gray-700">Nombre de la empresa</Label>
        <Input name="nombre" defaultValue={company?.nombre ?? ''} className="h-9 text-sm" />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-gray-700">Descripción</Label>
        <Textarea name="descripcion" defaultValue={company?.descripcion ?? ''} rows={3} className="text-sm resize-none" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-700">Ubicación</Label>
          <Input name="ubicacion" defaultValue={company?.ubicacion ?? ''} placeholder="San Salvador" className="h-9 text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-700">Industria</Label>
          <Input name="industria" defaultValue={company?.industria ?? ''} className="h-9 text-sm" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-gray-700">Sitio web</Label>
        <Input name="sitioWeb" defaultValue={company?.sitioWeb ?? ''} placeholder="https://miempresa.com.sv" className="h-9 text-sm" />
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
