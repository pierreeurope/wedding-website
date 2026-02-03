import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amalie & Pierre | Wedding',
  description: 'Join us for our wedding celebration on October 3rd, 2026 at Burg Schwarzenstein, Germany',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
