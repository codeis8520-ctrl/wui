'use client';
import { useEffect, useRef, useState } from 'react';
import { impact } from '@/content/proposal';
import { TrendingDown } from 'lucide-react';
import { SectionHeader } from './Problems';

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader title={impact.title} sub={impact.sub} />
        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {impact.metrics.map((m, i) => (
            <div
              key={m.label}
              className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl p-7 text-center"
            >
              <TrendingDown className="w-7 h-7 text-brand-600 mx-auto mb-3" />
              <div className="text-5xl md:text-6xl font-black text-brand-700 leading-none tabular-nums">
                <Counter target={m.value} started={started} delayMs={i * 150} />
                {m.suffix}
              </div>
              <p className="mt-3 text-ink-700 font-semibold">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({
  target,
  started,
  delayMs,
}: {
  target: number;
  started: boolean;
  delayMs: number;
}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      const start = Date.now();
      const duration = 900;
      const tick = () => {
        const t = Math.min(1, (Date.now() - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [started, target, delayMs]);
  return <>{value}</>;
}
