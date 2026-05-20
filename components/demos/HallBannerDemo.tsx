'use client';
import { useEffect, useState } from 'react';
import { Sparkles, Plus, Minus, Trophy, ChevronLeft } from 'lucide-react';

/**
 * 임박 식자재 → 홀 추천 + 인센티브 데모.
 *
 * 실제 구현 매핑:
 *  - GET /api/recommendations/today → 활성 추천 배너
 *  - POST /api/recommendations/:id/sale → 재고 차감 + 인센티브 적립
 *  - 잔여 수량 0 → 추천 자동 비활성, 식자재 status='CONSUMED'
 *  - IncentivePointLedger에 +100p 적립 row 생성
 */
const INITIAL_QTY = 1.6; // kg

export default function HallBannerDemo() {
  const [remaining, setRemaining] = useState(INITIAL_QTY);
  const [points, setPoints] = useState(2350); // 박서연의 기존 누적 포인트
  const [floatPoints, setFloatPoints] = useState<number | null>(null);
  const [view, setView] = useState<'home' | 'sale'>('home');
  const [saleQty, setSaleQty] = useState(0.2); // kg per dish
  const [recentSales, setRecentSales] = useState<number>(0);

  // float 포인트 애니메이션 자동 해제
  useEffect(() => {
    if (floatPoints === null) return;
    const t = setTimeout(() => setFloatPoints(null), 1500);
    return () => clearTimeout(t);
  }, [floatPoints]);

  const handleSale = () => {
    if (saleQty > remaining) return;
    setRemaining((r) => Math.max(0, r - saleQty));
    setPoints((p) => p + 100);
    setFloatPoints(100);
    setRecentSales((s) => s + 1);
    setView('home');
  };

  const depleted = remaining <= 0.0001;

  if (view === 'sale') {
    return (
      <SaleScreen
        remaining={remaining}
        saleQty={saleQty}
        setSaleQty={setSaleQty}
        onConfirm={handleSale}
        onBack={() => setView('home')}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-ink-50">
      {/* 헤더 */}
      <div className="px-5 pt-4 pb-3 bg-white border-b border-ink-100 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-ink-500 font-semibold">홀 직원 · 박서연</p>
            <h1 className="text-lg font-black text-ink-900 mt-0.5">오늘의 매장</h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-ink-500">내 포인트</p>
            <p className="text-lg font-black text-brand-700 tabular-nums">
              {points.toLocaleString()}p
            </p>
          </div>
        </div>
      </div>

      {/* 추천 배너 */}
      <div className="px-4 pt-4">
        {depleted ? (
          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 text-center">
            <Trophy className="w-7 h-7 text-brand-700 mx-auto mb-1" />
            <p className="font-bold text-brand-900 text-sm">임박 재고 완판!</p>
            <p className="text-[11px] text-ink-700 mt-1">
              오늘 {recentSales}건 추천 판매. 폐기 0원입니다.
            </p>
          </div>
        ) : (
          <div className="relative p-4 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200 overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-amber-300/40 blur-xl" />
            <div className="relative">
              <p className="text-[10px] font-bold text-amber-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI 추천 · 임박 식자재 소진
              </p>
              <p className="text-xl font-black text-ink-900 mt-1.5">닭볶음탕</p>
              <div className="mt-2 flex items-center gap-3 text-[11px]">
                <span className="px-2 py-0.5 rounded-full bg-white/70 text-ink-700 font-semibold">
                  닭다리살
                </span>
                <span className="text-ink-700">
                  잔여 <span className="font-black">{remaining.toFixed(1)}kg</span>
                </span>
                <span className="text-amber-700 font-bold">유통기한 D-1</span>
              </div>
              <button
                onClick={() => setView('sale')}
                className="w-full mt-3 py-2.5 rounded-xl bg-ink-900 hover:bg-ink-700 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                판매 기록 · 판매당 +100p
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 오늘의 주문 (정적 데이터) */}
      <div className="flex-1 px-4 pt-5 pb-4">
        <h3 className="text-xs font-bold text-ink-500 tracking-wide mb-2">오늘 주문 현황</h3>
        <div className="space-y-1.5">
          {[
            { table: 'T3', menu: '닭볶음탕', recent: recentSales >= 1 },
            { table: 'T7', menu: '닭볶음탕', recent: recentSales >= 2 },
            { table: 'T2', menu: '김치찌개', recent: false },
            { table: 'T5', menu: '닭볶음탕', recent: recentSales >= 3 },
          ].map((o, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-2.5 rounded-lg text-[12px] ${
                o.recent ? 'bg-brand-50 border border-brand-100' : 'bg-white border border-ink-100'
              }`}
            >
              <span className="font-bold text-ink-700">{o.table}</span>
              <span className="flex-1 ml-3 text-ink-900">{o.menu}</span>
              {o.recent && (
                <span className="text-[10px] font-bold text-brand-700 bg-white px-1.5 py-0.5 rounded">
                  +100p
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* float points animation */}
      {floatPoints !== null && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="text-3xl font-black text-brand-700 animate-bounce">
            +{floatPoints}p
          </div>
        </div>
      )}
    </div>
  );
}

function SaleScreen({
  remaining,
  saleQty,
  setSaleQty,
  onConfirm,
  onBack,
}: {
  remaining: number;
  saleQty: number;
  setSaleQty: (n: number) => void;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const valid = saleQty > 0 && saleQty <= remaining;
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-5 pt-4 pb-3 border-b border-ink-100 flex items-center gap-2 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft className="w-5 h-5 text-ink-700" />
        </button>
        <span className="text-[11px] text-ink-500 font-semibold flex-1">판매 기록</span>
      </div>

      <div className="flex-1 p-5">
        <h2 className="text-lg font-black text-ink-900">닭볶음탕 판매 등록</h2>
        <p className="text-[12px] text-ink-500 mt-1">사용한 닭다리살 양을 입력하세요</p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setSaleQty(Math.max(0.1, +(saleQty - 0.1).toFixed(1)))}
            className="w-14 h-14 rounded-full bg-ink-100 hover:bg-ink-100 active:bg-ink-300 grid place-items-center"
          >
            <Minus className="w-5 h-5 text-ink-700" />
          </button>
          <div className="text-center w-32">
            <p className="text-4xl font-black text-ink-900 tabular-nums">
              {saleQty.toFixed(1)}
              <span className="text-base text-ink-500 ml-1">kg</span>
            </p>
            <p className="text-[11px] text-ink-500 mt-1">잔여 {remaining.toFixed(1)}kg</p>
          </div>
          <button
            onClick={() => setSaleQty(+(saleQty + 0.1).toFixed(1))}
            disabled={saleQty + 0.1 > remaining}
            className="w-14 h-14 rounded-full bg-ink-100 hover:bg-ink-100 active:bg-ink-300 grid place-items-center disabled:opacity-30"
          >
            <Plus className="w-5 h-5 text-ink-700" />
          </button>
        </div>

        <div className="mt-6 p-3 rounded-xl bg-brand-50 border border-brand-100">
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-ink-700">획득 포인트</span>
            <span className="text-lg font-black text-brand-700">+100p</span>
          </div>
        </div>

        <button
          onClick={onConfirm}
          disabled={!valid}
          className={`w-full mt-5 py-3.5 rounded-xl font-bold text-sm transition ${
            valid
              ? 'bg-brand-700 hover:bg-brand-800 text-white'
              : 'bg-ink-100 text-ink-300 cursor-not-allowed'
          }`}
        >
          판매 확정
        </button>

        <p className="text-[11px] text-ink-500 text-center mt-3 leading-relaxed">
          확정하면 잔여 재고가 자동 차감되고<br />주방·사장님께 실시간 공유됩니다.
        </p>
      </div>
    </div>
  );
}
