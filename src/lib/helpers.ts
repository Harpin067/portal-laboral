/** Helpers compartidos para el portal IntegraJobs. */

export function timeAgo(date: Date): string {
  const ms   = Date.now() - new Date(date).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1)  return 'Justo ahora';
  if (mins < 60) return `Hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Hace ${hrs} hora${hrs > 1 ? 's' : ''}`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Hace 1 día';
  if (days < 7)   return `Hace ${days} días`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5)  return `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
  const months = Math.floor(days / 30);
  return `Hace ${months} mes${months > 1 ? 'es' : ''}`;
}

export function formatSalario(min: number | null, max: number | null): string {
  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;
  if (min && max) return `${fmt(min)}–${fmt(max)}`;
  if (min)        return `Desde ${fmt(min)}`;
  if (max)        return `Hasta ${fmt(max)}`;
  return 'No especificado';
}

const MODALIDAD: Record<string, string> = {
  remoto:     'Remoto',
  hibrido:    'Híbrido',
  presencial: 'Presencial',
};
export function modalidadLabel(t: string): string {
  return MODALIDAD[t] ?? t;
}

const CONTRATO: Record<string, string> = {
  completo:  'Tiempo completo',
  medio:     'Medio tiempo',
  temporal:  'Temporal',
  freelance: 'Freelance',
};
export function contratoLabel(t: string): string {
  return CONTRATO[t] ?? t;
}

const EXPERIENCIA: Record<string, string> = {
  junior: 'Junior',
  mid:    'Mid',
  senior: 'Senior',
  lead:   'Lead',
};
export function experienciaLabel(e: string): string {
  return EXPERIENCIA[e] ?? e;
}
