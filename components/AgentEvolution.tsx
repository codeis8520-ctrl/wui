'use client';
import { useEffect, useRef, useState } from 'react';
import { agentEvolution } from '@/content/proposal';
import { Check, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

/**
 * AI 에이전트의 시간에 따른 진화 시연 섹션.
 *
 * 같은 질문("닭다리살 임박이야")에 대해 1/3/6/12개월차 AI 답변이
 * 어떻게 풍부해지는지 인터랙티브 탭으로 보여준다.
 *
 * 핵심 메시지:
 *  - LLM 자체가 아니라 메모리/RAG/피드백 루프로 진화 효과를 만든다
 *  - 매장 데이터가 누적될수록 자동으로 똑똑해진다
 *  - 다른 매장 운영 SaaS와의 결정적 차별점
 */

export default function AgentEvolution() {
  const [activeIdx, setActiveIdx] = useState(3); // 기본 12개월 선택 (가장 강한 효과)
  const stage = agentEvolution.stages[activeIdx];
  const [typed, setTyped] = useState('');
  const cancelRef = useRef({ cancelled: false });

  // 탭 변경 시 답변 타이핑 애니메이션
  useEffect(() => {
    cancelRef.current.cancelled = true;
    cancelRef.current = { cancelled: false };
    const localCancel = cancelRef.current;
    setTyped('');
    (async () => {
      await sleep(120);
      for (let i = 1; i <= stage.answer.length; i++) {
        if (localCancel.cancelled) return;
        setTyped(stage.answer.slice(0, i));
        await sleep(12);
      }
    })();
    return () => {
      localCancel.cancelled = true;
    };
  }, [stage.answer]);

  return (
    <section id="evolution" className="py-20 md:py-28 bg-gradient-to-b from-white to-ink-50">
      <div className="max-w-6xl mx-auto px-5">
        {/* 헤더 */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-brand-700 text-sm font-bold mb-4 bg-brand-50 px-3 py-1 rounded-full">
            <TrendingUp className="w-4 h-4" />
            {agentEvolution.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1]">
            {agentEvolution.title}
          </h2>
          <p className="mt-5 text-ink-700 text-lg leading-relaxed">{agentEvolution.sub}</p>
        </div>

        {/* 타임라인 탭 */}
        <div className="mt-12 relative">
          {/* 연결선 */}
          <div className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-ink-300" />
          <div
            className="absolute top-7 left-[12.5%] h-px bg-brand-700 transition-all duration-500"
            style={{ width: `${(activeIdx / (agentEvolution.stages.length - 1)) * 75}%` }}
          />

          <div className="grid grid-cols-4 gap-2 relative">
            {agentEvolution.stages.map((s, i) => {
              const isActive = i === activeIdx;
              const isPassed = i < activeIdx;
              return (
                <button
                  key={s.month}
                  onClick={() => setActiveIdx(i)}
                  className="flex flex-col items-center group"
                >
                  <span
                    className={`w-14 h-14 rounded-full grid place-items-center font-black text-sm transition-all ${
                      isActive
                        ? 'bg-brand-700 text-white shadow-lg scale-110'
                        : isPassed
                        ? 'bg-brand-700 text-white'
                        : 'bg-white border-2 border-ink-300 text-ink-500 group-hover:border-brand-700 group-hover:text-brand-700'
                    }`}
                  >
                    {s.month}
                    <span className="text-[9px] font-bold ml-0.5">M</span>
                  </span>
                  <span
                    className={`mt-2 text-xs font-bold transition ${
                      isActive ? 'text-ink-900' : 'text-ink-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 메인 컨텐츠 — 능력 + 답변 */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* 좌측: 누적된 능력 */}
          <div className="bg-white border border-ink-100 rounded-2xl p-7">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-4 h-4 text-brand-700" />
              <h3 className="font-bold text-ink-900">{stage.label} · 진화한 능력</h3>
            </div>
            <ul className="space-y-3">
              {stage.abilities.map((ab, i) => {
                const isNew = stage.newThisStage.some((nw) => ab.includes(nw));
                return (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`shrink-0 w-5 h-5 rounded-full grid place-items-center mt-0.5 ${
                        isNew ? 'bg-amber-100 text-amber-700' : 'bg-brand-50 text-brand-700'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-sm text-ink-700 leading-relaxed">
                      {ab}
                      {isNew && (
                        <span className="ml-2 inline-flex items-center text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          NEW
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 우측: 채팅 시뮬레이션 */}
          <div className="bg-ink-900 rounded-2xl overflow-hidden flex flex-col shadow-xl">
            <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-white/60 font-semibold">
                AI 운영 비서 · {stage.label}
              </span>
            </div>
            <div className="p-5 space-y-3 flex-1">
              <div className="flex justify-end">
                <div className="bg-brand-700 text-white text-[14px] px-4 py-2.5 rounded-2xl rounded-br-md max-w-[80%] font-medium">
                  {agentEvolution.question}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white/10 text-white text-[14px] px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[88%] leading-relaxed">
                  {typed}
                  {typed.length < stage.answer.length && (
                    <span className="inline-block w-1.5 h-4 bg-white ml-0.5 align-middle animate-blink" />
                  )}
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-white/5 border-t border-white/10">
              <p className="text-[11px] text-white/60 leading-relaxed">
                ※ 같은 질문, 다른 답변. 매장 데이터가 누적될수록 답변이 풍부해집니다.
              </p>
            </div>
          </div>
        </div>

        {/* 단계 전환 힌트 */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-500">
          {agentEvolution.stages.map((s, i) => (
            <span key={s.month} className="flex items-center gap-2">
              <button
                onClick={() => setActiveIdx(i)}
                className={`font-bold transition ${
                  i === activeIdx ? 'text-brand-700' : 'hover:text-ink-700'
                }`}
              >
                {s.shortLabel}
              </button>
              {i < agentEvolution.stages.length - 1 && (
                <ArrowRight className="w-3 h-3 text-ink-300" />
              )}
            </span>
          ))}
        </div>

        {/* 2년차 메시지 */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white text-center">
          <p className="text-lg md:text-xl font-bold leading-relaxed">
            {agentEvolution.yearTwoLine}
          </p>
        </div>
      </div>
    </section>
  );
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
