# Owners — 외식업 매장 운영 OS (랜딩 페이지)

한국 외식업 사장님을 위한 매장 운영 OS의 마케팅·구독 랜딩 페이지.
구독제 v1.0(2026-05 시장조사 기반 단가). Vercel 호스팅, Next.js App Router.

## 로컬 실행

```bash
npm install
npm run dev   # http://localhost:3000
```

## 페이지

- `/` — 단일 매장 셀프 가입 (Starter ₩69k / Pro ₩129k / AI Plus ₩229k)
- `/franchise` — 가맹점 5~50개 본부 트랙 (HQ 라이선스 ₩790k + 매장당 ₩79k)
- `/proposals/[client]` — 특정 고객사용 영업 미팅 변형 페이지

## 단가/문구 수정

모든 카피·단가·FAQ는 `content/proposal.ts` 한 파일에 모여 있습니다.
- 셀프 가입 단가: `pricing.tiers`
- 본부 트랙: `franchisePricing` (HQ + perStore)
- 페르소나·문구는 `hero`, `problems`, `features`, `process`, `finalCta` 등

## 디자인

- Tailwind CSS v3
- 컬러: brand(주황) + ink(텍스트 그레이스케일) + amber/rose 강조
- 컴포넌트: `components/` 단일 매장용, `app/franchise/page.tsx` 본부용 (독립)

## Vercel 배포

`vercel.json`이 framework: nextjs로 고정. main에 push 시 자동 배포.
PR 푸시 시 preview 배포 자동 생성.

## 백엔드

랜딩은 정적·콘텐츠 페이지로만 동작. 회원가입·결제·실제 운영 데이터는
[`codeis8520-ctrl/franchise-os`](https://github.com/codeis8520-ctrl/franchise-os) 백엔드에서 처리.

## 페이지 섹션 구조 (기본 페이지)

1. Hero — 외식업 사장 페르소나
2. Problems — 4가지 페인 포인트
3. Features — 8가지 기능 (AI 비서 + 시급/주휴 자동계산 강조)
4. AgentChat — AI 비서 실시간 데모
5. AgentEvolution — 1/3/6/12개월차 AI 성숙도
6. Impact — 도입 효과 수치
7. Screens — 4컷 모바일 화면 미리보기 (체크리스트·홀배너·대시보드·온보딩)
8. Process — 2주 도입 일정
9. **Pricing — 구독제 3티어**
10. Trust — 데이터/보안
11. FAQ
12. Final CTA — 지금 구독 시작
13. Footer

## 회사

제이엘컴퍼니 · 이종림 대표 · 010-9958-8520
