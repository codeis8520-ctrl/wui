'use client';
import { useState } from 'react';
import { ClipboardCheck, Tag, LineChart, GraduationCap, Play, type LucideIcon } from 'lucide-react';
import { screens } from '@/content/proposal';
import { SectionHeader } from './Problems';
import InteractiveDemo from './demos/InteractiveDemo';
import ChecklistDemo from './demos/ChecklistDemo';
import HallBannerDemo from './demos/HallBannerDemo';
import DashboardDemo from './demos/DashboardDemo';
import OnboardingDemo from './demos/OnboardingDemo';

/**
 * 화면 미리보기 섹션. 각 카드는 클릭 시 인터랙티브 데모 모달을 연다.
 *
 * 4개 데모는 모두 실제 구현 예정 기능과 1:1로 매핑되어 있다.
 * 카메라/푸시 같은 디바이스 기능만 모의 처리되며, 데이터·버튼·상태 전이는
 * 실제 production 코드에서 그대로 재현 가능한 흐름이다.
 */

type Slot = 'checklist' | 'hall' | 'dashboard' | 'onboarding';

const CARDS: Array<{
  slot: Slot;
  Icon: LucideIcon;
  tint: string;
  iconBg: string;
  iconColor: string;
  subtitle: string;
}> = [
  {
    slot: 'checklist',
    Icon: ClipboardCheck,
    tint: 'from-emerald-50 to-white',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    subtitle: '카메라로 찍어야만 완료 체크가 활성화됩니다',
  },
  {
    slot: 'hall',
    Icon: Tag,
    tint: 'from-amber-50 to-white',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    subtitle: '주방이 등록한 임박 재고가 푸시와 함께 자동 노출',
  },
  {
    slot: 'dashboard',
    Icon: LineChart,
    tint: 'from-indigo-50 to-white',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
    subtitle: '월별 매출 / 원가율 / 메뉴 비중 자동 시각화',
  },
  {
    slot: 'onboarding',
    Icon: GraduationCap,
    tint: 'from-rose-50 to-white',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
    subtitle: '신규 직원이 챕터 학습 + 퀴즈로 SOP를 익힙니다',
  },
];

const TITLES: Record<Slot, string> = {
  checklist: '사진 인증 체크리스트',
  hall: '홀 직원 추천 배너',
  dashboard: '매출 대시보드',
  onboarding: '신규 직원 온보딩',
};

const DETAIL_SUB: Record<Slot, string> = {
  checklist: '직원이 사진을 찍어야만 완료 체크가 활성화되고, 사장님 폰에 실시간 타임라인으로 들어옵니다.',
  hall: '주방이 임박 식자재를 등록하면 홀 앱 상단에 추천 배너가 뜨고, 판매 성공 시 인센티브가 적립됩니다.',
  dashboard: '마감 때 입력된 매출/매입을 자동으로 시각화. AI가 원가율 변화의 원인까지 함께 알려줍니다.',
  onboarding: '입사 첫날 신규 직원이 매장 매뉴얼을 챕터별로 학습. 퀴즈 통과해야 다음 챕터가 열립니다.',
};

const TITLE_MAP_BY_SLOT: Record<Slot, string> = TITLES;

export default function Screens() {
  const [openSlot, setOpenSlot] = useState<Slot | null>(null);

  return (
    <section id="screens" className="py-20 md:py-28 bg-ink-50">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader title={screens.title} sub={screens.sub} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {screens.items.map((it, i) => {
            const card = CARDS[i] ?? CARDS[0];
            const Icon = card.Icon;
            return (
              <button
                key={it.title}
                onClick={() => setOpenSlot(card.slot)}
                className="group text-left bg-white border border-ink-100 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 hover:border-brand-100 transition-all"
              >
                <div
                  className={`aspect-[4/5] rounded-xl bg-gradient-to-br ${card.tint} p-3 mb-4 overflow-hidden relative grid place-items-center`}
                >
                  <span className={`absolute inset-0 ${card.iconBg} opacity-20`} />
                  <span
                    className={`relative w-14 h-14 rounded-2xl bg-white shadow-md grid place-items-center ${card.iconColor}`}
                  >
                    <Icon className="w-7 h-7" />
                  </span>
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 bg-ink-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md group-hover:bg-brand-700 transition">
                    <Play className="w-3 h-3 fill-white" />
                    체험하기
                  </span>
                </div>
                <h3 className="font-bold text-ink-900">{it.title}</h3>
                <p className="text-sm text-ink-500 mt-1 leading-relaxed">{card.subtitle}</p>
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-ink-500">
          ※ 모든 데모는 실제 구현 예정 화면과 동일한 흐름으로 동작합니다. 데이터·버튼·상태 전이는 라이브이며, 카메라/푸시 알림만 모의 처리됩니다.
        </p>
      </div>

      <InteractiveDemo
        open={openSlot !== null}
        onClose={() => setOpenSlot(null)}
        title={openSlot ? TITLE_MAP_BY_SLOT[openSlot] : ''}
        subtitle={openSlot ? DETAIL_SUB[openSlot] : ''}
      >
        {openSlot === 'checklist' && <ChecklistDemo key="checklist" />}
        {openSlot === 'hall' && <HallBannerDemo key="hall" />}
        {openSlot === 'dashboard' && <DashboardDemo key="dashboard" />}
        {openSlot === 'onboarding' && <OnboardingDemo key="onboarding" />}
      </InteractiveDemo>
    </section>
  );
}
