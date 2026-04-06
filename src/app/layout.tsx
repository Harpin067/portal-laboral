import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/Header';
import SessionProvider from '@/components/shared/SessionProvider';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Portal de Trabajo',
  description: 'Encuentra tu próximo empleo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
        <SessionProvider>
          <Header />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
