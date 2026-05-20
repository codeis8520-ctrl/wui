import { trust } from '@/content/proposal';
import { Lock, Shield, Bot, type LucideIcon } from 'lucide-react';
import { SectionHeader } from './Problems';

const ICONS: Record<string, LucideIcon> = { Lock, Shield, Bot };

export default function Trust() {
  return (
    <section id="trust" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader title={trust.title} />
        <div className="grid sm:grid-cols-3 gap-5 mt-10">
          {trust.items.map((it) => {
            const Icon = ICONS[it.icon] ?? Lock;
            return (
              <div
                key={it.title}
                className="bg-white border border-ink-100 rounded-2xl p-6 text-center"
              >
                <span className="inline-flex w-12 h-12 rounded-xl bg-brand-50 text-brand-700 items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="font-bold">{it.title}</h3>
                <p className="text-sm text-ink-700 mt-2 leading-relaxed">{it.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
