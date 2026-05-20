'use client';
import { useState } from 'react';
import { faq } from '@/content/proposal';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from './Problems';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 md:py-28 bg-ink-50">
      <div className="max-w-3xl mx-auto px-5">
        <SectionHeader title={faq.title} />
        <div className="mt-10 space-y-3">
          {faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={it.q}
                className="bg-white border border-ink-100 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full text-left flex items-center justify-between gap-3 px-5 py-4"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-ink-900">{it.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-ink-500 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-ink-700 leading-relaxed">{it.a}</p>
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
