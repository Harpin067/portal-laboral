'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const PRIVATE_PREFIXES = ['/admin', '/empresa', '/candidato'];

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPrivate = PRIVATE_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isPrivate) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
    </>
  );
}
