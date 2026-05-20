import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * /proposals/[client] — 다른 고객사용 변형 페이지.
 *
 * 슬러그 → 클라이언트 정보 매핑만 두고, 본 페이지 골격(@/app/page.tsx)을 재사용한다.
 * 빠른 협상을 위해 매장별 단가를 다르게 가져갈 때 사용.
 *
 * 운영 예:
 *   /proposals/way        → 웨이 티하우스 (기본 페이지와 동일)
 *   /proposals/sample-bbq → 다른 매장 (단가 다름)
 *
 * 실제 콘텐츠 차등화는 content/proposal.ts를 클라이언트 슬러그 단위로 분리하면 됨.
 * 1차 출시에서는 기본 페이지로 redirect/공유.
 */

const KNOWN_CLIENTS: Record<string, { name: string }> = {
  way: { name: '웨이 티하우스 앤 레스토랑' },
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
