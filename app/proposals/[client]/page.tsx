import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * /proposals/[client] — 특정 고객사용 맞춤 변형 페이지 (영업 미팅용).
 *
 * 본 페이지 골격은 @/app/page.tsx를 재사용하고, 슬러그 → 표시명만 갈아끼운다.
 * 일반 SaaS 가입은 /(기본 페이지)에서 진행, 본 라우트는 본부·체인 단위 영업 미팅 후
 * 별도 단가/문구를 적용할 때만 사용.
 *
 * 새 고객 추가:
 *   KNOWN_CLIENTS에 슬러그 등록 → 필요 시 content/proposal.ts를 슬러그별로 분리.
 */

const KNOWN_CLIENTS: Record<string, { name: string }> = {
  // 영업 미팅 시 슬러그 추가. 예: 'demo-bbq': { name: '○○ 바비큐' }
};

export function generateMetadata({ params }: { params: { client: string } }): Metadata {
  const c = KNOWN_CLIENTS[params.client];
  if (!c) return { title: '제안서' };
  return {
    title: `Owners 운영 제안 · ${c.name}`,
    robots: { index: false, follow: false },
  };
}

import Page from '@/app/page';

export default function ClientProposalPage({ params }: { params: { client: string } }) {
  if (!KNOWN_CLIENTS[params.client]) notFound();
  return <Page />;
}
