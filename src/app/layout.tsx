'use client'

import '../i18n'
import "./globals.css";

import { DisplayProvider } from '@/contexts/DisplayProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <DisplayProvider>
          {children}
        </DisplayProvider>
      </body>
    </html>
  );
}

