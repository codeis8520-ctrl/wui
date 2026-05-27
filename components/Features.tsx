import { features } from '@/content/proposal';
import {
  ClipboardCheck,
  PackageSearch,
  CalendarClock,
  BarChart3,
  Sparkles,
  GraduationCap,
  FileSpreadsheet,
  Timer,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from './Problems';

const ICONS: Record<string, LucideIcon> = {
  ClipboardCheck,
  PackageSearch,
  CalendarClock,
  BarChart3,
  Sparkles,
  GraduationCap,
  FileSpreadsheet,
  Timer,
};

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader title={features.title} sub={features.sub} />
        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {features.items.map((it, idx) => {
            const Icon = ICONS[it.icon] ?? Sparkles;
            const isHighlight = !!it.highlight;
            return (
              <div
                key={it.title}
                className={`relative rounded-2xl p-7 transition group ${
                  isHighlight
                    ? 'md:col-span-2 bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-xl'
                    : 'bg-white border border-ink-100 hover:border-ink-300'
                }`}
              >
                <div className="flex items-start gap-5">
                  <span
                    className={`shrink-0 w-12 h-12 rounded-xl grid place-items-center ${
                      isHighlight
                        ? 'bg-white/15 text-amber-300'
                        : 'bg-brand-50 text-brand-700'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-xl">{it.title}</h3>
                      {isHighlight && (
                        <span className="text-[11px] font-bold bg-amber-400 text-ink-900 px-2 py-0.5 rounded-full">
                          NEW
                        </span>
                      )}
                      <span
                        className={`text-xs ${
                          isHighlight ? 'text-white/60' : 'text-ink-500'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </div>
                    <p
                      className={`mt-2 leading-relaxed ${
                        isHighlight ? 'text-white/85 text-[15px]' : 'text-ink-700'
                      }`}
                    >
                      {it.body}
                    </p>
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
