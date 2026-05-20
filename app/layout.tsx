import type { Metadata } from 'next';
import './globals.css';
import { brand, client } from '@/content/proposal';

export const metadata: Metadata = {
  title: `${brand.name} 운영 제안 · ${client.name}`,
  description: brand.tagline,
  openGraph: {
    title: `${client.name} 운영 제안서`,
    description: '사장님의 구두 지시를 시스템이 대신합니다.',
    type: 'website',
  },
  robots: { index: false, follow: false }, // 제안용 — 검색 노출 차단
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans">{children}</body>
    </html>
  );
}
