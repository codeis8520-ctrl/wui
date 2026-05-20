import { problems } from '@/content/proposal';
import { Sparkles, Trash2, Repeat, FileX, type LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = { Sparkles, Trash2, Repeat, FileX };

export default function Problems() {
  return (
    <section id="problems" className="py-20 md:py-28 bg-ink-50">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader title={problems.title} sub={problems.sub} />
        <div className="grid sm:grid-cols-2 gap-4 mt-12">
          {problems.items.map((it) => {
            const Icon = ICONS[it.icon] ?? Sparkles;
            return (
              <div
                key={it.title}
                className="bg-white border border-ink-100 rounded-2xl p-6 hover:border-ink-300 transition"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-rose-50 text-rose-600 grid place-items-center">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-lg">{it.title}</h3>
                    <p className="text-ink-700 mt-1.5 leading-relaxed">{it.body}</p>
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

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">{title}</h2>
      {sub && <p className="mt-4 text-ink-700 text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}
