'use client';
import { useEffect, useRef, useState } from 'react';
import { agentDemo } from '@/content/proposal';
import { Sparkles, Send } from 'lucide-react';

type Msg = { role: 'user' | 'assistant'; text: string; partial?: boolean };

export default function AgentChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const cancelRef = useRef<{ cancelled: boolean }>({ cancelled: false });
  const scrollRef = useRef<HTMLDivElement>(null);

  const ask = async (idx: number) => {
    if (active !== null) cancelRef.current.cancelled = true;
    cancelRef.current = { cancelled: false };
    setActive(idx);
    const { q, a } = agentDemo.conversations[idx];
    setMessages([{ role: 'user', text: q }]);
    // 잠깐의 "생각하는" 지연
    await sleep(450);
    if (cancelRef.current.cancelled) return;
    // 타이핑 효과
    setMessages([{ role: 'user', text: q }, { role: 'assistant', text: '', partial: true }]);
    for (let i = 1; i <= a.length; i++) {
      if (cancelRef.current.cancelled) return;
      await sleep(15);
      setMessages([
        { role: 'user', text: q },
        { role: 'assistant', text: a.slice(0, i), partial: i < a.length },
      ]);
    }
  };

  useEffect(() => {
    // 첫 진입 시 첫 번째 질문 자동 시연
    ask(0);
    return () => {
      cancelRef.current.cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: 'smooth' });
  }, [messages]);

  return (
    <section id="agent" className="py-20 md:py-28 bg-ink-900 text-white relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-700/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="max-w-6xl mx-auto px-5 relative">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-amber-300 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            AI 운영 비서
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
            {agentDemo.title}
          </h2>
          <p className="mt-4 text-white/70 text-lg leading-relaxed">{agentDemo.sub}</p>
        </div>

        <div className="mt-12 grid md:grid-cols-12 gap-6">
          {/* Question chips */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs text-white/50 font-semibold tracking-wide mb-2">
              사장님이 자주 묻는 질문
            </p>
            {agentDemo.conversations.map((c, i) => (
              <button
                key={c.q}
                onClick={() => ask(i)}
                className={`w-full text-left p-4 rounded-xl border transition ${
                  active === i
                    ? 'bg-brand-700 border-brand-700 text-white'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/90'
                }`}
              >
                <span className="text-xs text-white/50 font-mono mr-2">Q{i + 1}</span>
                {c.q}
              </button>
            ))}
            <p className="text-xs text-white/40 mt-4 leading-relaxed">{agentDemo.footnote}</p>
          </div>

          {/* Chat surface */}
          <div className="md:col-span-8">
            <div className="bg-white text-ink-900 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-ink-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-ink-500 font-semibold">
                  Owners · AI 운영 비서
                </span>
              </div>
              <div
                ref={scrollRef}
                className="px-5 py-6 min-h-[280px] max-h-[360px] overflow-y-auto space-y-3"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-brand-700 text-white rounded-br-md'
                          : 'bg-ink-100 text-ink-900 rounded-bl-md'
                      }`}
                    >
                      {m.text}
                      {m.partial && (
                        <span className="inline-block w-1.5 h-4 bg-ink-700 ml-0.5 align-middle animate-blink" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-ink-100 px-5 py-3 flex items-center gap-2">
                <input
                  className="flex-1 bg-ink-50 rounded-lg px-3 py-2 text-sm outline-none"
                  placeholder="질문을 입력하세요 (데모용 — 실제 동작은 도입 후)"
                  readOnly
                />
                <button className="bg-brand-700 text-white p-2 rounded-lg" aria-label="send">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
