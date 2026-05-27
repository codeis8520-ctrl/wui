import { hero } from '@/content/proposal';
import { CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-white" />
      <div className="max-w-6xl mx-auto px-5 pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          {/* Left: Copy */}
          <div className="md:col-span-7">
            <p className="text-brand-700 font-semibold text-sm tracking-wide mb-4">
              {hero.eyebrow}
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
              {hero.h1Top}
              <br />
              <span className="text-brand-700">{hero.h1Bottom}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-ink-700 leading-relaxed">{hero.sub}</p>
            <div className="mt-6 p-4 rounded-xl bg-white border border-brand-100 shadow-sm">
              <p className="text-[15px] text-ink-700">{hero.personaLine}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={hero.primaryCta.target}
                className="inline-flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition"
              >
                {hero.primaryCta.label}
                <span aria-hidden>→</span>
              </a>
              <a
                href={hero.secondaryCta.target}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-ink-50 text-ink-900 font-semibold px-6 py-3.5 rounded-xl border border-ink-300 transition"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-500">
              {hero.badges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Phone mockups stack */}
          <div className="md:col-span-5">
            <PhoneStack />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneStack() {
  return (
    <div className="relative h-[460px] md:h-[520px]">
      {/* Back phone — Checklist */}
      <PhoneMock
        className="absolute right-12 top-2 rotate-[-6deg] scale-90 opacity-90"
        title="오늘 체크리스트"
      >
        <div className="space-y-2 mt-3">
          {[
            { t: '홀 바닥 청소', done: true },
            { t: '냉장고 온도 확인', done: true },
            { t: '주방 후드 청소', done: false },
            { t: '마감 정산', done: false },
          ].map((it, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 p-2.5 rounded-lg ${
                it.done ? 'bg-brand-50' : 'bg-ink-50'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-md grid place-items-center text-[11px] ${
                  it.done ? 'bg-brand-600 text-white' : 'bg-white border border-ink-300'
                }`}
              >
                {it.done ? '✓' : ''}
              </span>
              <span
                className={`text-[12px] ${
                  it.done ? 'line-through text-ink-500' : 'text-ink-900'
                }`}
              >
                {it.t}
              </span>
            </div>
          ))}
        </div>
      </PhoneMock>

      {/* Middle phone — Hall banner */}
      <PhoneMock
        className="absolute left-0 top-16 rotate-[2deg]"
        title="오늘의 추천"
      >
        <div className="mt-3 p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
          <p className="text-[11px] font-bold text-amber-700">임박 식자재 소진 추천</p>
          <p className="text-[14px] font-bold text-ink-900 mt-1">오늘의 추천 메뉴</p>
          <p className="text-[11px] text-ink-700 mt-1">임박 재고 · D-1</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-amber-700">판매당 +100p</span>
            <button className="text-[11px] bg-brand-700 text-white px-2 py-1 rounded">
              판매 기록
            </button>
          </div>
        </div>
      </PhoneMock>

      {/* Front phone — AI chat */}
      <PhoneMock
        className="absolute right-0 bottom-0 rotate-[4deg] shadow-2xl"
        title="AI 운영 비서"
      >
        <div className="mt-3 space-y-2">
          <div className="flex justify-end">
            <div className="bg-brand-700 text-white text-[11px] px-2.5 py-1.5 rounded-lg max-w-[80%]">
              오늘 마감 청소 누가 안 했어?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-ink-100 text-ink-900 text-[11px] px-2.5 py-1.5 rounded-lg max-w-[85%]">
              홀 1명·주방 1명 미완료. 두 분께 푸시 보냈습니다.
            </div>
          </div>
        </div>
      </PhoneMock>
    </div>
  );
}

function PhoneMock({
  className = '',
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`w-[210px] h-[380px] bg-white rounded-[26px] border-[6px] border-ink-900 p-3 shadow-xl ${className}`}
    >
      <div className="h-1 w-12 bg-ink-100 rounded-full mx-auto mb-3" />
      <p className="text-[11px] font-bold text-ink-500">{title}</p>
      {children}
    </div>
  );
}
