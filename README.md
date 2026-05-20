# Owners 운영 제안 랜딩페이지

웨이 티하우스 앤 레스토랑 사장님 검토용. 단가 협의 단계 v0.1.

## 로컬 실행

```bash
cd landing
npm install
npm run dev   # http://localhost:3000
```

## 단가/문구 수정

모든 카피·단가·FAQ·연락처는 `content/proposal.ts` 한 파일에 모여 있습니다.
- 단가가 확정되면 `pricing.tiers[*].monthly` 와 `pricing.pricesPending: false`로 변경
- 클라이언트사명·페르소나는 `client` 객체 수정

## Vercel 배포

1. https://vercel.com → New Project → 이 디렉터리(`landing`)를 Root로 import
2. (선택) 환경변수 등록:
   - `SLACK_WEBHOOK_URL` — 제안 수락 폼 제출 시 슬랙 알림
   - `RESEND_API_KEY` + `NOTIFY_EMAIL_TO` + `NOTIFY_EMAIL_FROM` — 이메일 알림
   - 둘 다 비워두면 Vercel Functions 로그에만 남습니다 (시연용으로 안전)
3. Deploy → `https://owners-proposal.vercel.app` 같은 URL 발급
4. 사장님께 공유

또는 CLI로:

```bash
npm i -g vercel
vercel --prod
```

## 다른 고객사 변형 페이지

`/proposals/[client]` 라우트로 동일 골격에 회사명만 갈아끼울 수 있습니다.
현재는 `way` 슬러그가 기본 페이지를 재사용합니다.

## 페이지 섹션 구조

1. Hero — 사장님 페르소나 카피
2. Problems — 4가지 페인 포인트
3. Features — 5가지 기능 (AI는 강조 카드)
4. AgentChat — 실시간 타이핑 데모
5. Impact — 도입 효과 수치 (count-up)
6. Screens — 4컷 화면 미리보기
7. Process — 12주 단계별 도입 일정 (설계 → 개발 → 파일럿 → 본격 가동)
8. **Pricing — 본 페이지 KPI 지점**
9. Trust — 데이터/보안
10. FAQ — 6개 아코디언
11. Final CTA — 수락 폼
12. Footer
