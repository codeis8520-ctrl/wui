'use client';
import { useEffect, useState } from 'react';
import { brand } from '@/content/proposal';

const links = [
  { href: '#problems', label: '문제' },
  { href: '#features', label: '솔루션' },
  { href: '#agent', label: 'AI 비서' },
  { href: '#pricing', label: '단가' },
  { href: '#faq', label: 'FAQ' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all no-print ${
        scrolled ? 'bg-white/85 backdrop-blur border-b border-ink-100' : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-brand-700 grid place-items-center text-white font-black">
            O
          </span>
          <span className="font-bold tracking-tight">{brand.name}</span>
          <span className="hidden sm:inline text-xs text-ink-500 ml-1">{brand.tagline}</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-ink-700">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink-900 transition">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#pricing"
          className="inline-flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          제안 단가 확인
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
