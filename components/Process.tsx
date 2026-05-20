import { process as proc } from '@/content/proposal';
import { SectionHeader } from './Problems';

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader title={proc.title} sub={proc.sub} />
        <ol className="mt-12 grid md:grid-cols-4 gap-5 relative">
          {/* connector line */}
          <span
            aria-hidden
            className="hidden md:block absolute top-7 left-8 right-8 h-px bg-brand-100"
          />
          {proc.steps.map((s, i) => (
            <li
              key={s.range}
              className="relative bg-white border border-ink-100 rounded-2xl p-6 hover:border-brand-100 transition"
            >
              <span className="relative z-10 inline-flex items-center gap-2 mb-3">
                <span className="w-9 h-9 rounded-full bg-brand-700 text-white grid place-items-center font-bold text-sm">
                  {i + 1}
                </span>
                <span className="text-xs font-mono text-brand-700 font-bold">{s.range}</span>
              </span>
              <h3 className="font-bold text-lg">{s.title}</h3>
              <p className="text-sm text-ink-700 mt-2 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
