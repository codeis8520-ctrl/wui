/**
 * 제안서 컨텐츠 단일 진입점.
 * 단가/문구 협의 중 자주 바뀌므로 이 파일 하나만 수정하면 전 페이지에 반영된다.
 *
 * 클라이언트별 변형은 `client` 객체만 갈아끼우면 됨.
 * (예: /proposals/[client] 동적 라우트에서 다른 client 객체 주입)
 */

export type Tier = {
  id: 'starter' | 'pro' | 'ai_plus';
  name: string;
  badge?: string;
  tagline: string;
  monthly: string;            // 표시용 (예: "₩179,000")
  monthlyNote: string;        // 단위 설명
  features: string[];
  highlight?: boolean;        // 추천 표시
  ctaLabel: string;
};

export const brand = {
  name: 'Owners',
  tagline: '사장님을 위한 매장 운영 OS',
  // 단가가 확정되면 아래 banner 문구를 지우거나 'v1.0'으로 변경.
  proposalBanner: '본 페이지는 협의 단계의 제안 버전입니다 · 단가는 협의 진행 중',
};

export const client = {
  name: '웨이 티하우스 앤 레스토랑',
  shortName: '웨이',
  contactPerson: '사장님',
  // 페르소나: 현재는 단일 매장, 곧 다점포 확장 예정.
  personaHook: '지금 한 매장에서 매뉴얼을 시스템으로 옮겨두면, 2호점·3호점이 늘어나도 사장님 손이 늘어나지 않습니다.',
};

export const hero = {
  eyebrow: `${client.name} 운영 제안서`,
  h1Top: '사장님의 구두 지시를',
  h1Bottom: '시스템이 대신합니다.',
  sub: '식자재 폐기 · 마감 누락 · 흐지부지된 회의 결정 — 매장이 사장님 없이도 매뉴얼대로 굴러가게.',
  personaLine: client.personaHook,
  primaryCta: { label: '제안 단가 확인', target: '#pricing' },
  secondaryCta: { label: '데모 화면 보기', target: '#screens' },
  badges: ['매장별 데이터 격리', 'POS 연동 불필요', '3주 안에 자리잡음'],
};

export const problems = {
  title: `${client.contactPerson}, 이런 일… 일주일에 몇 번이세요?`,
  sub: '한 매장에서도 자주 발생합니다. 매장이 늘어나면 정확히 매장 수만큼 곱해집니다.',
  items: [
    {
      icon: 'Sparkles',
      title: '마감 청소가 빠집니다',
      body: '"오늘 마감 청소했지?"라는 말이 통하던 시절은 지났어요. 다음 날 매장이 알려줍니다.',
    },
    {
      icon: 'Trash2',
      title: '임박 식자재를 그냥 버립니다',
      body: '냉장고 안쪽에서 발견된 한 박스. 그게 한 달이면 수십만 원입니다.',
    },
    {
      icon: 'Repeat',
      title: '같은 지시를 매일 반복합니다',
      body: '사장님의 에너지는 하루 8시간이지만, 같은 말을 10번씩 합니다.',
    },
    {
      icon: 'FileX',
      title: '회의 결정이 다음 주에 사라집니다',
      body: '"이건 다음 주에 하자"가 다음 분기까지 안 굴러갑니다.',
    },
  ],
};

export const features = {
  title: '5가지 기능, 하나의 운영 흐름',
  sub: '개별 기능이 아니라, 사장님이 평소 머리로 처리하던 일을 한 흐름으로 묶었습니다.',
  items: [
    {
      icon: 'ClipboardCheck',
      title: '사진 인증 체크리스트',
      body: '청소·점검·정리 — 카메라로 찍어야만 완료 체크가 활성화됩니다. 사장님 폰에는 사진과 시각이 실시간 타임라인으로 들어옵니다.',
    },
    {
      icon: 'PackageSearch',
      title: '임박 식자재 → 홀 자동 추천',
      body: '주방이 임박 재고를 등록하면, 홀 직원 앱 상단에 추천 메뉴 배너가 즉시 뜹니다. 판매 성공 시 인센티브 포인트가 자동 적립됩니다.',
    },
    {
      icon: 'CalendarClock',
      title: 'D-Day 역산 이벤트',
      body: '7월 초복 삼계탕 데이 같은 이벤트를 등록하면 D-3주, D-1주 시점에 담당자에게 자동으로 태스크와 푸시가 발행됩니다.',
    },
    {
      icon: 'BarChart3',
      title: '수동 정산 매출 대시보드',
      body: 'POS 없이 마감 때 총매출·매입·메뉴별 판매를 한 화면에서 입력. 월별 매출 추이, 원가율, 메뉴 비중을 자동 시각화합니다.',
    },
    {
      icon: 'Sparkles',
      title: 'AI 운영 비서',
      body: '사장님 시각으로 매장의 모든 이벤트를 보고, 사장님 대신 직원에게 푸시도 보내고, 사장님·직원의 질문에 매장 정보로 답합니다.',
      highlight: true,
    },
  ],
};

export const agentDemo = {
  title: '사장님 머리에 직원 한 명 더 둔 효과',
  sub: 'AI 운영 비서는 매장 메뉴·SOP·직원 명단·매출 데이터를 네이티브하게 학습합니다. 외부 인터넷이 아니라 본 매장 데이터만 봅니다.',
  conversations: [
    {
      q: '오늘 마감 청소 누가 안 했어?',
      a: '오늘 마감 체크리스트 4건 중 2건이 미완료입니다. 박서연(홀), 김민준(주방)이 미완료. 두 분께 푸시 보냈습니다.',
    },
    {
      q: '닭다리살 임박이야',
      a: '"닭다리살 200g, 유통기한 D-1" 등록 확인. 홀 전원에게 닭볶음탕 추천 멘트 발송 완료. 판매당 100p 인센티브 적용 중입니다.',
    },
    {
      q: '이번 달 원가율 어때?',
      a: '이번 달 누적 원가율 32.4%, 지난달 대비 +2.1%p입니다. 임박 식자재 폐기율 상승이 주원인. 임박 등록은 평소보다 12건 늘었습니다.',
    },
  ],
  footnote: '이 모든 답변은 사장님 매장 데이터만으로 생성됩니다. 외부 학습 데이터로 흘러가지 않습니다.',
};

export const impact = {
  title: '도입 3개월 후 예상 수치',
  sub: '유사 규모 매장 시뮬레이션 기준. 도입 매장별 실측 결과는 별도 리포트 제공.',
  metrics: [
    { value: -30, suffix: '%', label: '식자재 폐기 감소', accent: 'down' as const },
    { value: -90, suffix: '%', label: '마감 누락 감소', accent: 'down' as const },
    { value: -1, suffix: '시간/일', label: '사장 운영 시간 절감', accent: 'down' as const },
  ],
};

export const screens = {
  title: '실제 화면 미리보기',
  sub: '시안이 아니라 실제 구현된 화면입니다. 데모 계정으로 직접 만져보실 수 있습니다.',
  items: [
    { title: '사진 인증 체크리스트', desc: '직원이 사진을 찍어야만 완료 체크가 활성' },
    { title: '홀 직원 추천 배너', desc: '주방이 등록한 임박 재고가 푸시와 함께 자동 노출' },
    { title: '매출 대시보드', desc: '월별 매출 / 원가율 / 메뉴 비중 자동 시각화' },
    { title: 'AI 운영 비서 채팅', desc: '사장 시각으로 매장을 보고 직원에게 직접 푸시 가능' },
  ],
};

export const process = {
  title: '3주면 자리 잡습니다',
  sub: `${client.shortName} 매장 규모 기준 권장 일정`,
  steps: [
    { range: 'Day 1–3', title: '매장 정보·메뉴·SOP 등록', body: '사장님 30분 인터뷰 1회. 운영 매뉴얼은 우리가 받아 적습니다.' },
    { range: 'Day 4–7', title: '직원 계정 발급 & 사진 체크리스트 가동', body: '아침/마감 루틴이 즉시 가동됩니다.' },
    { range: 'Week 2', title: '임박 식자재 & 수동 정산 정착', body: '주방·홀이 입력을 손에 익히는 기간.' },
    { range: 'Week 3', title: 'AI 운영 비서 가동', body: '매장 SOP 학습이 끝나는 시점부터 자동 응답·자동 푸시가 시작됩니다.' },
  ],
};

export const pricing = {
  title: `${client.name} 제안 단가`,
  sub: '매장 1곳 기준 월 사용료. 매장 수가 늘어나면 자동 할인이 적용됩니다.',
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      tagline: '기본 운영 시스템',
      monthly: '₩89,000',
      monthlyNote: '/ 월 / 매장 1곳',
      features: [
        '사진 인증 체크리스트',
        '임박 식자재 등록',
        '수동 정산 매출 대시보드',
        '직원 5명까지',
      ],
      ctaLabel: 'Starter로 시작',
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: '추천',
      tagline: '확장 대비, 모든 운영 자동화',
      monthly: '₩179,000',
      monthlyNote: '/ 월 / 매장 1곳',
      features: [
        'Starter의 모든 기능',
        'D-Day 역산 이벤트 자동화',
        '회의록 → Task 자동 변환',
        '홀 인센티브 정산',
        '직원 무제한',
      ],
      highlight: true,
      ctaLabel: 'Pro로 시작',
    },
    {
      id: 'ai_plus',
      name: 'AI Plus',
      tagline: '사장님 시각의 AI 운영 비서',
      monthly: '₩289,000',
      monthlyNote: '/ 월 / 매장 1곳',
      features: [
        'Pro의 모든 기능',
        'AI 운영 비서 (사장/직원 Q&A)',
        '도메인 이벤트 자동 감시 & 푸시',
        '회의록 자동 요약 & Task 변환',
        '월간 운영 리포트 자동 생성',
      ],
      ctaLabel: 'AI Plus로 시작',
    },
  ] as Tier[],
  setupFee: {
    label: '초기 구축비 (1회)',
    amount: '₩890,000',
    note: '매장 정보·SOP 등록 + 직원 온보딩 교육 1회 포함',
  },
  multiStoreDiscount: [
    { range: '2 매장+', off: '10% 할인' },
    { range: '5 매장+', off: '20% 할인' },
    { range: '10 매장+', off: '별도 협의' },
  ],
  guarantee: '도입 30일 안에 효과 없으면 사용료 전액 환불',
  pricesPending: true,
  pricesPendingNote: '* 위 단가는 협의 단계의 제안입니다. 단가 확정 후 본 페이지에 반영됩니다.',
};

export const trust = {
  title: '데이터·보안',
  items: [
    { icon: 'Lock', title: '매장별 데이터 완전 격리', body: '한 매장의 데이터가 다른 매장에 노출되지 않습니다.' },
    { icon: 'Shield', title: '사진·대화 로그 암호화', body: '저장 시 암호화, 전송 시 TLS. 백업은 일 1회.' },
    { icon: 'Bot', title: 'AI는 본 매장 데이터만', body: 'Anthropic Claude API 기반. 매장 데이터는 모델 학습에 사용되지 않습니다.' },
  ],
};

export const faq = {
  title: '자주 묻는 질문',
  items: [
    {
      q: 'POS 연동이 꼭 필요하지 않다고요?',
      a: '네. 마감 시 매출·매입을 사장님(또는 매니저)이 한 화면에서 수동 입력하는 방식입니다. 별도 POS 업체와의 연동 협의 없이 곧바로 도입 가능합니다.',
    },
    {
      q: '직원이 잘 안 쓰면 어떡하죠?',
      a: '체크리스트는 "사진을 찍어야만 완료" 구조라 형식적 체크가 불가능합니다. 임박 식자재 추천은 판매 시 인센티브가 즉시 적립되어 홀 직원이 능동적으로 활용합니다.',
    },
    {
      q: '사진은 얼마나 보관되나요?',
      a: '기본 90일. 사장님이 매장별로 보관 기간을 조정할 수 있습니다. 기간 경과 시 자동 삭제됩니다.',
    },
    {
      q: 'AI가 잘못된 푸시를 보내면요?',
      a: 'AI의 모든 행동은 AgentDirective 감사 로그에 "왜 보냈는지"가 기록됩니다. 사장님이 사후 검토 가능하고, 자동 푸시 권한은 매장 단위로 ON/OFF 할 수 있습니다.',
    },
    {
      q: '도중에 해지 가능한가요?',
      a: '월 단위 해지 가능. 도입 30일 안에 효과를 못 보시면 사용료 전액 환불해 드립니다.',
    },
    {
      q: '우리 매장만의 특별한 SOP가 있는데, AI가 이해할까요?',
      a: 'AI는 매장 SOP·메뉴·정책 문서를 시스템 컨텍스트로 항상 참조합니다. 도입 초기 인터뷰 1회로 매장 매뉴얼을 받아 적은 뒤, 이후 변경되는 SOP는 사장님이 직접 추가/수정할 수 있습니다.',
    },
  ],
};

export const finalCta = {
  title: `${client.contactPerson}, 이 제안을 수락하시겠습니까?`,
  sub: '단가가 미확정인 단계입니다. 우선 의사만 남겨주시면 다음 미팅에서 확정 단가와 함께 계약서를 가져갑니다.',
  primaryLabel: '단가 수락하고 시작하기',
  secondaryLabel: '30분 미팅 잡기',
};

export const footer = {
  company: '주식회사 Owners (가칭)',
  bizNo: '000-00-00000',
  contactName: '담당자: ___',
  email: 'hello@owners.kr',
  phone: '010-0000-0000',
  copyrightYear: 2026,
};
