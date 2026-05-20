import { finalCta, developer } from '@/content/proposal';
import { Building2, Phone } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section id="cta" className="py-20 md:py-32 bg-ink-900 text-white relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-brand-700/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="max-w-3xl mx-auto px-5 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {finalCta.title}
          </h2>
          <p className="mt-6 text-white/75 text-lg leading-relaxed">{finalCta.sub}</p>
        </div>

        <div className="bg-white text-ink-900 rounded-2xl p-8 md:p-10 shadow-2xl">
          <div className="flex items-center gap-3 text-ink-500 text-xs font-semibold tracking-wide mb-5">
            <Building2 className="w-4 h-4" />
            <span>개발업체</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-ink-500 font-semibold mb-1">회사명</p>
              <p className="text-2xl font-black text-ink-900">{developer.company}</p>
            </div>
            <div>
              <p className="text-xs text-ink-500 font-semibold mb-1">{developer.ceoLabel}</p>
              <p className="text-2xl font-black text-ink-900">{developer.ceoName}</p>
            </div>
          </div>
          <a
            href={`tel:${developer.phone.replace(/-/g, '')}`}
            className="mt-6 flex items-center justify-between gap-3 p-4 rounded-xl bg-brand-50 border border-brand-100 hover:bg-brand-100 transition group"
          >
            <span className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-brand-700 text-white grid place-items-center group-hover:scale-105 transition">
                <Phone className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-xs text-ink-500 font-semibold">연락처</span>
                <span className="block text-xl font-black text-ink-900 tabular-nums">
                  {developer.phone}
                </span>
              </span>
            </span>
            <span className="text-xs text-brand-700 font-bold hidden sm:inline">탭하여 전화 →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
