import { pricing } from '@/content/proposal';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { SectionHeader } from './Problems';

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-gradient-to-b from-ink-50 to-white">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader title={pricing.title} sub={pricing.sub} />

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {pricing.tiers.map((t) => (
            <div
              key={t.id}
              className={`relative rounded-2xl p-7 flex flex-col ${
                t.highlight
                  ? 'bg-ink-900 text-white shadow-2xl md:scale-[1.04] z-10 border border-brand-700'
                  : 'bg-white border border-ink-100'
              }`}
            >
              {t.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-ink-900 text-xs font-bold px-3 py-1 rounded-full">
                  {t.badge}
                </span>
              )}
              <div className="flex items-center gap-2 mb-2">
                {t.id === 'ai_plus' && <Sparkles className="w-4 h-4 text-amber-400" />}
                <h3
                  className={`font-black text-xl ${
                    t.highlight ? 'text-white' : 'text-ink-900'
                  }`}
                >
                  {t.name}
                </h3>
              </div>
              <p className={`text-sm ${t.highlight ? 'text-white/60' : 'text-ink-500'}`}>
                {t.tagline}
              </p>
              <div className="mt-5">
                <span
                  className={`text-4xl font-black tracking-tight ${
                    t.highlight ? 'text-white' : 'text-ink-900'
                  }`}
                >
                  {t.monthly}
                </span>
                <span
                  className={`ml-1 text-sm ${t.highlight ? 'text-white/60' : 'text-ink-500'}`}
                >
                  {t.monthlyNote}
                </span>
              </div>
              {pricing.pricesPending && (
                <span
                  className={`mt-1 inline-block text-[11px] font-semibold ${
                    t.highlight ? 'text-amber-300' : 'text-amber-600'
                  }`}
                >
                  협의 진행 중
                </span>
              )}
              <ul className="mt-6 space-y-2.5 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm leading-relaxed">
                    <Check
                      className={`shrink-0 w-4 h-4 mt-0.5 ${
                        t.highlight ? 'text-amber-400' : 'text-brand-600'
                      }`}
                    />
                    <span className={t.highlight ? 'text-white/90' : 'text-ink-700'}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-7 text-center font-semibold py-3 rounded-xl transition ${
                  t.highlight
                    ? 'bg-amber-400 hover:bg-amber-300 text-ink-900'
                    : 'bg-brand-700 hover:bg-brand-800 text-white'
                }`}
              >
                {t.ctaLabel}
              </a>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <div className="bg-white border border-ink-100 rounded-xl p-5">
            <p className="text-xs text-ink-500 font-semibold mb-1">{pricing.setupFee.label}</p>
            <p className="text-2xl font-black text-ink-900">{pricing.setupFee.amount}</p>
            <p className="text-sm text-ink-700 mt-1">{pricing.setupFee.note}</p>
          </div>
          <div className="bg-white border border-ink-100 rounded-xl p-5">
            <p className="text-xs text-ink-500 font-semibold mb-2">매장 수 자동 할인</p>
            <ul className="space-y-1.5 text-sm">
              {pricing.multiStoreDiscount.map((d) => (
                <li key={d.range} className="flex justify-between">
                  <span className="text-ink-700">{d.range}</span>
                  <span className="text-brand-700 font-bold">{d.off}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <p className="text-xs text-emerald-700 font-bold">30일 무위험 조항</p>
            </div>
            <p className="text-sm text-emerald-900 font-semibold leading-relaxed">
              {pricing.guarantee}
            </p>
          </div>
        </div>

        {pricing.pricesPending && (
          <p className="mt-8 text-center text-sm text-amber-700">
            {pricing.pricesPendingNote}
          </p>
        )}
      </div>
    </section>
  );
}
