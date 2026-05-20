'use client';
import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * 매출 대시보드 데모.
 *
 * 실제 구현 매핑:
 *  - DailySales / DailyMenuSales 모델 ✅
 *  - GET /api/sales/dashboard?period=this_month|last_30|last_7
 *  - 차트는 production에서 recharts 사용 예정. 본 데모는 동일 데이터 구조의 SVG.
 *  - 사장님이 보는 화면 (모바일 또는 태블릿)
 */
type Period = '7d' | '30d' | 'this_month';

const DATA: Record<Period, { label: string; revenue: number; cost: number; days: number[] }> = {
  '7d': {
    label: '최근 7일',
    revenue: 29_400_000,
    cost: 9_500_000,
    days: [3.8, 4.2, 4.1, 3.9, 5.1, 4.5, 3.8],
  },
  '30d': {
    label: '최근 30일',
    revenue: 118_200_000,
    cost: 38_300_000,
    days: [
      3.5, 3.8, 4.1, 4.2, 3.9, 4.5, 3.8, 4.0, 4.2, 3.8, 3.9, 4.1, 4.4, 3.7, 3.6, 4.2, 4.5, 4.7,
      4.0, 3.9, 4.1, 4.3, 4.6, 4.2, 3.9, 4.5, 4.8, 4.1, 3.9, 4.0,
    ],
  },
  this_month: {
    label: '이번 달',
    revenue: 42_180_000,
    cost: 13_660_000,
    days: [3.5, 3.8, 4.1, 4.2, 3.9, 4.5, 3.8, 4.0, 4.2, 3.8],
  },
};

const MENU_MIX = [
  { name: '닭볶음탕', share: 28, color: 'bg-brand-600' },
  { name: '시그니처 티 세트', share: 22, color: 'bg-amber-500' },
  { name: '연잎밥 정식', share: 18, color: 'bg-rose-500' },
  { name: '오미자차', share: 14, color: 'bg-indigo-500' },
  { name: '기타', share: 18, color: 'bg-ink-300' },
];

export default function DashboardDemo() {
  const [period, setPeriod] = useState<Period>('this_month');
  const [hovered, setHovered] = useState<number | null>(null);
  const d = DATA[period];

  const costRatio = (d.cost / d.revenue) * 100;
  const prevCostRatio = 30.3; // 비교용 가상 직전기간

  return (
    <div className="flex flex-col h-full bg-ink-50">
      {/* 헤더 */}
      <div className="px-5 pt-4 pb-3 bg-white border-b border-ink-100 sticky top-0 z-10">
        <p className="text-[11px] text-ink-500 font-semibold">사장님 · 웨이 티하우스</p>
        <h1 className="text-lg font-black text-ink-900 mt-0.5">매출 대시보드</h1>

        {/* 기간 토글 */}
        <div className="mt-3 flex gap-1 p-1 bg-ink-100 rounded-lg">
          {(['7d', '30d', 'this_month'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-1.5 rounded text-[11px] font-semibold transition ${
                period === p ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'
              }`}
            >
              {DATA[p].label}
            </button>
          ))}
        </div>
      </div>

      {/* 핵심 지표 */}
      <div className="px-4 pt-4 grid grid-cols-2 gap-2">
        <Metric label="총 매출" value={`₩${Math.round(d.revenue / 10000).toLocaleString()}만`} />
        <Metric
          label="원가율"
          value={`${costRatio.toFixed(1)}%`}
          delta={costRatio - prevCostRatio}
          deltaIsBad
        />
      </div>

      {/* 차트 */}
      <div className="px-4 pt-3">
        <div className="bg-white rounded-xl p-3 border border-ink-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-bold text-ink-700">일별 매출 (백만원)</p>
            {hovered !== null && (
              <p className="text-[10px] text-ink-500 tabular-nums">
                Day {hovered + 1}: ₩{(d.days[hovered] * 1_000_000).toLocaleString()}
              </p>
            )}
          </div>
          <BarChart values={d.days} onHover={setHovered} />
        </div>
      </div>

      {/* 메뉴 비중 */}
      <div className="px-4 pt-3 pb-4 flex-1">
        <div className="bg-white rounded-xl p-3 border border-ink-100">
          <p className="text-[11px] font-bold text-ink-700 mb-3">메뉴별 판매 비중</p>
          <div className="flex w-full h-3 rounded-full overflow-hidden mb-3">
            {MENU_MIX.map((m) => (
              <div key={m.name} className={m.color} style={{ width: `${m.share}%` }} />
            ))}
          </div>
          <div className="space-y-1.5">
            {MENU_MIX.map((m) => (
              <div key={m.name} className="flex items-center gap-2 text-[11px]">
                <span className={`w-2.5 h-2.5 rounded-sm ${m.color}`} />
                <span className="flex-1 text-ink-700">{m.name}</span>
                <span className="font-bold tabular-nums text-ink-900">{m.share}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI 인사이트 카드 */}
        <div className="mt-3 p-3 rounded-xl bg-ink-900 text-white">
          <p className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
            <span>✨</span> AI 인사이트
          </p>
          <p className="text-[12px] mt-1 leading-relaxed">
            원가율이 직전기간 대비 +{(costRatio - prevCostRatio).toFixed(1)}%p 상승했습니다.
            임박 식자재 등록은 늘었지만 추천 판매 전환율이 낮은 게 원인입니다.
          </p>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  delta,
  deltaIsBad,
}: {
  label: string;
  value: string;
  delta?: number;
  deltaIsBad?: boolean;
}) {
  const positive = (delta ?? 0) > 0;
  const isBad = deltaIsBad ? positive : !positive;
  return (
    <div className="bg-white rounded-xl p-3 border border-ink-100">
      <p className="text-[10px] text-ink-500 font-semibold">{label}</p>
      <p className="text-xl font-black text-ink-900 mt-0.5 tabular-nums">{value}</p>
      {delta !== undefined && (
        <p
          className={`text-[10px] font-bold mt-0.5 flex items-center gap-0.5 ${
            isBad ? 'text-rose-600' : 'text-emerald-600'
          }`}
        >
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(delta).toFixed(1)}%p
        </p>
      )}
    </div>
  );
}

function BarChart({
  values,
  onHover,
}: {
  values: number[];
  onHover: (i: number | null) => void;
}) {
  const max = Math.max(...values);
  return (
    <div
      className="h-24 flex items-end gap-0.5"
      onMouseLeave={() => onHover(null)}
    >
      {values.map((v, i) => (
        <button
          key={i}
          onMouseEnter={() => onHover(i)}
          onClick={() => onHover(i)}
          className="flex-1 bg-gradient-to-t from-brand-700 to-brand-400 rounded-t hover:from-brand-800 transition"
          style={{ height: `${(v / max) * 100}%`, minHeight: '8%' }}
        />
      ))}
    </div>
  );
}
