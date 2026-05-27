import type { Metadata } from 'next';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  AlertTriangle,
  LayoutGrid,
  Upload,
  Camera,
  FileText,
  Sparkles,
} from 'lucide-react';
import {
  franchiseBrand,
  franchiseHero,
  franchiseStats,
  franchiseProblems,
  franchiseFeatures,
  franchiseProcess,
  franchisePricing,
  franchiseFaq,
  franchiseFinalCta,
  developer,
  footer,
} from '@/content/proposal';

export const metadata: Metadata = {
  title: 'Owners 프랜차이즈 본부 트랙 — 가맹점 5~50개 본부용 운영 OS',
  description:
    '본부 콘솔 + 가맹점 모바일이 한 시스템. SOP 일괄 배포, 사진 인증 정기 점검, AI 본부 시각 비서, 가맹사업법 분쟁 방지 로그까지.',
  robots: { index: false, follow: false },
};

const FEATURE_ICONS = [LayoutGrid, Upload, Camera, FileText, Sparkles];

export default function FranchisePage() {
  return (
    <main className="bg-white text-ink-900">
      {/* 상단 협의 단계 안내선 */}
      <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-center text-xs py-2 px-4">
        {franchiseBrand.banner}
      </div>

      <FranchiseHero />
      <FranchiseStats />
      <FranchiseProblems />
      <FranchiseFeatures />
      <FranchiseProcess />
      <FranchisePricing />
      <FranchiseFaq />
      <FranchiseFinalCta />
      <FranchiseFooter />
    </main>
  );
}

/* ============================================================
 *  Hero
 * ========================================================== */
function FranchiseHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-white" />
      <div className="max-w-6xl mx-auto px-5 pt-14 pb-20 md:pt-20 md:pb-24">
        <p className="text-brand-700 font-semibold text-sm tracking-wide mb-4">
          {franchiseBrand.eyebrow} · {franchiseHero.eyebrow}
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-4xl">
          {franchiseHero.h1Top}
          <br />
          <span className="text-brand-700">{franchiseHero.h1Bottom}</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-ink-700 leading-relaxed max-w-3xl">
          {franchiseHero.sub}
        </p>
        <div className="mt-6 p-4 rounded-xl bg-white border border-brand-100 shadow-sm max-w-3xl">
          <p className="text-[15px] text-ink-700">{franchiseHero.personaLine}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={franchiseHero.primaryCta.target}
            className="inline-flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            {franchiseHero.primaryCta.label}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={franchiseHero.secondaryCta.target}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-ink-50 text-ink-900 font-semibold px-6 py-3.5 rounded-xl border border-ink-300 transition"
          >
            {franchiseHero.secondaryCta.label}
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-500">
          {franchiseHero.badges.map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 *  Stats — 시장조사 근거 4개
 * ========================================================== */
function FranchiseStats() {
  return (
    <section className="py-16 md:py-20 bg-ink-50 border-y border-ink-100">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
          {franchiseStats.title}
        </h2>
        <p className="mt-2 text-ink-500 text-sm">{franchiseStats.sub}</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {franchiseStats.items.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-5 border border-ink-100 shadow-sm"
            >
              <p className="text-3xl md:text-4xl font-black text-brand-700 tracking-tight">
                {s.figure}
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-900">{s.label}</p>
              <p className="mt-1 text-xs text-ink-500 leading-relaxed">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 *  Problems
 * ========================================================== */
function FranchiseProblems() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          {franchiseProblems.title}
        </h2>
        <p className="mt-3 text-ink-700">{franchiseProblems.sub}</p>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {franchiseProblems.items.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  <p className="mt-2 text-ink-700 text-[15px] leading-relaxed">{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 *  Features
 * ========================================================== */
function FranchiseFeatures() {
  return (
    <section
      id="franchise-features"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-50"
    >
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          {franchiseFeatures.title}
        </h2>
        <p className="mt-3 text-ink-700">{franchiseFeatures.sub}</p>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {franchiseFeatures.items.map((f, i) => {
            const Icon = FEATURE_ICONS[i] ?? LayoutGrid;
            const isHighlight = 'highlight' in f && f.highlight;
            return (
              <div
                key={f.title}
                className={`rounded-2xl p-6 border shadow-sm ${
                  isHighlight
                    ? 'bg-brand-700 text-white border-brand-700 md:col-span-2'
                    : 'bg-white border-ink-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${
                      isHighlight ? 'bg-white/15' : 'bg-brand-50'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isHighlight ? 'text-white' : 'text-brand-700'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{f.title}</h3>
                    <p
                      className={`mt-2 text-[15px] leading-relaxed ${
                        isHighlight ? 'text-white/90' : 'text-ink-700'
                      }`}
                    >
                      {f.body}
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

/* ============================================================
 *  Process
 * ========================================================== */
function FranchiseProcess() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          {franchiseProcess.title}
        </h2>
        <p className="mt-3 text-ink-700">{franchiseProcess.sub}</p>
        <ol className="mt-10 space-y-4">
          {franchiseProcess.steps.map((s, i) => (
            <li
              key={s.title}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm flex gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-700 text-white grid place-items-center font-black text-lg shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-700">{s.range}</p>
                <h3 className="mt-0.5 font-bold text-lg">{s.title}</h3>
                <p className="mt-2 text-ink-700 text-[15px] leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================================================
 *  Pricing — franchisePricing
 * ========================================================== */
function FranchisePricing() {
  return (
    <section
      id="franchise-pricing"
      className="py-16 md:py-24 bg-ink-900 text-white"
    >
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          {franchisePricing.title}
        </h2>
        <p className="mt-3 text-ink-300 max-w-3xl">{franchisePricing.sub}</p>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {/* HQ License */}
          <div className="rounded-2xl p-7 bg-ink-800 border border-ink-700">
            <p className="text-sm font-semibold text-brand-300">
              {franchisePricing.hqLicense.name}
            </p>
            <p className="mt-2 text-4xl font-black tracking-tight">
              {franchisePricing.hqLicense.monthly}
            </p>
            <p className="text-sm text-ink-400">
              {franchisePricing.hqLicense.monthlyNote}
            </p>
            <ul className="mt-6 space-y-2.5">
              {franchisePricing.hqLicense.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[15px] text-ink-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-300 mt-1 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Per-Store */}
          <div className="rounded-2xl p-7 bg-brand-700 border border-brand-600 relative">
            <span className="absolute -top-3 right-5 bg-white text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full shadow">
              가맹점 일괄
            </span>
            <p className="text-sm font-semibold text-brand-100">
              {franchisePricing.perStore.name}
            </p>
            <p className="mt-2 text-4xl font-black tracking-tight">
              {franchisePricing.perStore.monthly}
            </p>
            <p className="text-sm text-brand-100">
              {franchisePricing.perStore.monthlyNote}
            </p>
            <ul className="mt-6 space-y-2.5">
              {franchisePricing.perStore.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[15px] text-white"
                >
                  <CheckCircle2 className="w-4 h-4 text-white mt-1 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 예시 박스 */}
        <div className="mt-8 rounded-2xl p-6 bg-ink-800 border border-ink-700">
          <p className="text-sm font-semibold text-brand-300">
            {franchisePricing.example.label}
          </p>
          <p className="mt-2 text-2xl font-black">
            {franchisePricing.example.breakdown}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-300">
            <li>· {franchisePricing.example.perStore}</li>
            <li>· {franchisePricing.example.headcountValue}</li>
          </ul>
        </div>

        {/* 셋업비 + 보장 */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5 bg-ink-800 border border-ink-700">
            <p className="text-xs font-semibold text-ink-400">
              {franchisePricing.setupFee.label}
            </p>
            <p className="mt-1 text-2xl font-black">
              {franchisePricing.setupFee.amount}
            </p>
            <p className="mt-2 text-sm text-ink-300 leading-relaxed">
              {franchisePricing.setupFee.note}
            </p>
          </div>
          <div className="rounded-xl p-5 bg-brand-50 text-ink-900 border border-brand-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-700" />
              <p className="font-bold">도입 효과 보장</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              {franchisePricing.guarantee}
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-ink-400">
          {franchisePricing.pricesPendingNote}
        </p>
      </div>
    </section>
  );
}

/* ============================================================
 *  FAQ
 * ========================================================== */
function FranchiseFaq() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          {franchiseFaq.title}
        </h2>
        <div className="mt-8 space-y-3">
          {franchiseFaq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-ink-100 bg-white p-5 shadow-sm"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-bold text-[16px]">{item.q}</h3>
                <span className="text-ink-400 group-open:rotate-45 transition-transform text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink-700 text-[15px] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 *  Final CTA
 * ========================================================== */
function FranchiseFinalCta() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-700 to-brand-800 text-white">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          {franchiseFinalCta.title}
        </h2>
        <p className="mt-4 text-lg text-white/90 leading-relaxed">
          {franchiseFinalCta.sub}
        </p>
        <div className="mt-8 inline-flex flex-col items-center gap-3 bg-white text-ink-900 px-6 py-5 rounded-2xl shadow-2xl">
          <p className="text-sm font-semibold text-ink-500">
            {developer.company} · {developer.ceoLabel} {developer.ceoName}
          </p>
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <a
              href={`tel:${developer.phone.replace(/-/g, '')}`}
              className="inline-flex items-center gap-2 font-bold text-lg"
            >
              <Phone className="w-5 h-5 text-brand-700" />
              {developer.phone}
            </a>
          </div>
          <p className="text-xs text-ink-500">
            {franchiseFinalCta.ctaLabel} — 전화 또는 문자로 본부 규모(가맹점 수)만 알려주세요.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 *  Footer
 * ========================================================== */
function FranchiseFooter() {
  return (
    <footer className="py-10 bg-ink-900 text-ink-400 text-sm">
      <div className="max-w-6xl mx-auto px-5 flex flex-wrap items-center justify-between gap-3">
        <p>
          © {footer.copyrightYear} {footer.company} · {footer.ceoLabel}{' '}
          {footer.ceoName}
        </p>
        <a href="/" className="text-ink-300 hover:text-white transition">
          ← 단일 매장 페이지로
        </a>
      </div>
    </footer>
  );
}
