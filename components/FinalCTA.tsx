'use client';
import { useState } from 'react';
import { finalCta, pricing, client } from '@/content/proposal';
import { Check, Loader2 } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'ok' | 'error';

export default function FinalCTA() {
  const [status, setStatus] = useState<Status>('idle');
  const [tier, setTier] = useState<string>('pro');
  const [storeName, setStoreName] = useState<string>(client.name);
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [memo, setMemo] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, storeName, contactName, phone, memo }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus('ok');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : '제출 중 오류가 발생했습니다.');
    }
  };

  return (
    <section id="cta" className="py-20 md:py-32 bg-ink-900 text-white relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-brand-700/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="max-w-3xl mx-auto px-5 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {finalCta.title}
          </h2>
          <p className="mt-4 text-white/70 text-lg leading-relaxed">{finalCta.sub}</p>
        </div>

        {status === 'ok' ? (
          <div className="bg-white text-ink-900 rounded-2xl p-10 text-center shadow-2xl">
            <Check className="w-12 h-12 text-brand-600 mx-auto mb-4" />
            <h3 className="text-2xl font-black">제안 수락 의사가 접수되었습니다</h3>
            <p className="mt-3 text-ink-700 leading-relaxed">
              담당자가 영업일 기준 1일 안에 연락드리겠습니다.
              <br />
              다음 미팅에서 확정 단가와 계약서를 가져갑니다.
            </p>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="bg-white text-ink-900 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="매장명" required>
                <input
                  className="input"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                />
              </Field>
              <Field label="사장님 성함" required>
                <input
                  className="input"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </Field>
              <Field label="연락처" required>
                <input
                  className="input"
                  type="tel"
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Field>
              <Field label="선택 플랜">
                <select
                  className="input"
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                >
                  {pricing.tiers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                      {t.badge ? ` (${t.badge})` : ''}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="전달 사항 (선택)">
              <textarea
                rows={3}
                className="input"
                placeholder="예) 다음 주 수요일 오전에 미팅 가능합니다."
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </Field>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-800 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    제출 중...
                  </>
                ) : (
                  <>{finalCta.primaryLabel} →</>
                )}
              </button>
              <a
                href="https://calendly.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-ink-50 text-ink-900 font-bold py-3.5 rounded-xl border border-ink-300 transition"
              >
                {finalCta.secondaryLabel}
              </a>
            </div>
            {status === 'error' && (
              <p className="mt-4 text-sm text-rose-600">{errorMsg}</p>
            )}
            <p className="mt-5 text-xs text-ink-500 text-center">
              제출하신 정보는 본 제안 진행 목적 외 사용되지 않습니다.
            </p>

            <style>{`.input { width: 100%; background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 12px; padding: 12px 14px; font-size: 15px; color: #0F172A; outline: none; transition: border-color .15s; }
              .input:focus { border-color: #047857; box-shadow: 0 0 0 3px rgba(4,120,87,.15); }`}</style>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink-700">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
