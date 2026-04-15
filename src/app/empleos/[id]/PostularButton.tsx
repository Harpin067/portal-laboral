'use client';

import { useTransition, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Briefcase, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { postularseVacante } from '@/actions/candidato';

export function PostularButton({ vacancyId }: { vacancyId: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pending, start] = useTransition();
  const [done, setDone]  = useState(false);
  const [error, setError] = useState('');

  const role = ((session?.user as any)?.role as string | undefined)?.toUpperCase();

  function handleClick() {
    if (status !== 'authenticated') {
      router.push('/login');
      return;
    }
    if (role !== 'CANDIDATO') {
      setError('Solo candidatos pueden postularse.');
      return;
    }
    start(async () => {
      try {
        await postularseVacante(vacancyId);
        setDone(true);
      } catch (err: any) {
        setError(err.message ?? 'Error al postularte.');
      }
    });
  }

  if (done) {
    return (
      <Button disabled className="w-full sm:w-auto bg-emerald-600 text-white font-semibold h-11 px-8 gap-2 rounded-xl">
        <CheckCircle2 className="h-4 w-4" /> Postulación enviada
      </Button>
    );
  }

  return (
    <div>
      <Button
        onClick={handleClick}
        disabled={pending}
        className="w-full sm:w-auto bg-[#1A56DB] hover:bg-[#1440a8] text-white font-semibold h-11 px-8 gap-2 rounded-xl shadow-md shadow-blue-200"
      >
        {pending ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Postulando...</>
        ) : (
          <><Briefcase className="h-4 w-4" /> Postularme a esta vacante</>
        )}
      </Button>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      {status !== 'authenticated' && (
        <p className="text-xs text-slate-400 mt-2">Necesitas una cuenta para postular. Es gratis.</p>
      )}
    </div>
  );
}
