import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PublicShell from '@/components/shared/PublicShell';
import SessionProvider from '@/components/shared/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IntegraJobs',
  description: 'Encuentra tu próximo empleo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <SessionProvider>
          <PublicShell>{children}</PublicShell>
        </SessionProvider>
      </body>
    </html>
  );
}
