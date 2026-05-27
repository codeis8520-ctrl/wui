import type { Metadata } from 'next';
import './globals.css';
import { brand } from '@/content/proposal';

export const metadata: Metadata = {
  title: `${brand.name} — 외식업 매장 운영 OS`,
  description:
    '사진 인증 체크리스트 · 임박 식자재 자동 추천 · 시급/주휴 자동계산 · AI 운영 비서. 한국 외식업 사장님을 위한 통합 운영 OS.',
  openGraph: {
    title: `${brand.name} — 외식업 매장 운영 OS`,
    description: '사장님의 구두 지시를 시스템이 대신합니다.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans">{children}</body>
    </html>
  );
}
