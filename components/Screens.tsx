import { screens } from '@/content/proposal';
import { SectionHeader } from './Problems';
import { ClipboardCheck, Tag, LineChart, Bot } from 'lucide-react';

const PREVIEWS = [
  { kind: 'checklist' as const, Icon: ClipboardCheck },
  { kind: 'banner' as const, Icon: Tag },
  { kind: 'dashboard' as const, Icon: LineChart },
  { kind: 'chat' as const, Icon: Bot },
];

export default function Screens() {
  return (
    <section id="screens" className="py-20 md:py-28 bg-ink-50">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader title={screens.title} sub={screens.sub} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {screens.items.map((it, i) => {
            const { kind, Icon } = PREVIEWS[i] ?? PREVIEWS[0];
            return (
              <div
                key={it.title}
                className="bg-white border border-ink-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <div className="aspect-[4/5] rounded-xl bg-ink-900 p-3 mb-4 overflow-hidden">
                  <ScreenPreview kind={kind} />
                </div>
                <div className="flex items-start gap-2">
                  <Icon className="w-4 h-4 text-brand-700 mt-1" />
                  <div>
                    <h3 className="font-bold">{it.title}</h3>
                    <p className="text-sm text-ink-500 mt-1">{it.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ScreenPreview({ kind }: { kind: 'checklist' | 'banner' | 'dashboard' | 'chat' }) {
  if (kind === 'checklist') {
    return (
      <div className="bg-white rounded-lg h-full p-3 space-y-1.5 text-[10px]">
        <p className="font-bold text-ink-900">오늘 체크리스트</p>
        {[
          { t: '홀 바닥 청소', d: true },
          { t: '냉장고 온도 확인', d: true },
          { t: '주방 후드 청소', d: false },
          { t: '컵 위생 점검', d: false },
          { t: '마감 정산', d: false },
        ].map((it, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 p-1.5 rounded ${it.d ? 'bg-brand-50' : 'bg-ink-50'}`}
          >
            <span
              className={`w-3 h-3 rounded grid place-items-center text-[8px] ${
                it.d ? 'bg-brand-600 text-white' : 'border border-ink-300 bg-white'
              }`}
            >
              {it.d ? '✓' : ''}
            </span>
            <span className={`flex-1 ${it.d ? 'line-through text-ink-500' : ''}`}>{it.t}</span>
            <span className="text-ink-500">📷</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'banner') {
    return (
      <div className="bg-white rounded-lg h-full p-3 text-[10px]">
        <div className="p-2.5 rounded-md bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200">
          <p className="font-bold text-amber-700 text-[9px]">임박 식자재 추천 ✨</p>
          <p className="font-bold text-ink-900 mt-1 text-[12px]">닭볶음탕</p>
          <p className="text-ink-700 mt-0.5">닭다리살 200g · D-1</p>
          <div className="flex justify-between mt-2 items-center">
            <span className="text-amber-700">+100p / 판매</span>
            <span className="bg-brand-700 text-white px-1.5 py-0.5 rounded">판매</span>
          </div>
        </div>
        <p className="font-bold mt-3 text-ink-700">오늘의 주문</p>
        {['테이블 3 · 닭볶음탕', '테이블 7 · 닭볶음탕', '테이블 2 · 김치찌개'].map((t, i) => (
          <div key={i} className="p-1.5 rounded bg-ink-50 mt-1">
            {t}
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'dashboard') {
    return (
      <div className="bg-white rounded-lg h-full p-3 text-[10px] flex flex-col">
        <p className="font-bold text-ink-900">이번 달 매출</p>
        <p className="font-black text-brand-700 text-[18px] mt-0.5 tabular-nums">₩42,180,000</p>
        <p className="text-ink-500 text-[9px]">원가율 32.4% · 전월 +2.1%p</p>
        <div className="flex-1 mt-3 flex items-end gap-1">
          {[40, 65, 50, 80, 60, 90, 75, 95, 70, 85].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 bg-gradient-to-t from-brand-600 to-brand-400 rounded-t"
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1 mt-2 text-[8px] text-ink-500">
          <span>1주</span>
          <span className="text-center">2주</span>
          <span className="text-right">4주</span>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg h-full p-3 text-[10px] space-y-2">
      <div className="flex justify-end">
        <div className="bg-brand-700 text-white px-2 py-1 rounded">원가율 어때?</div>
      </div>
      <div className="flex justify-start">
        <div className="bg-ink-100 px-2 py-1 rounded">32.4%, 전월 +2.1%p입니다.</div>
      </div>
      <div className="flex justify-end">
        <div className="bg-brand-700 text-white px-2 py-1 rounded">왜 올랐어?</div>
      </div>
      <div className="flex justify-start">
        <div className="bg-ink-100 px-2 py-1 rounded">임박 식자재 폐기율 ↑. 임박 등록은 +12건.</div>
      </div>
    </div>
  );
}
