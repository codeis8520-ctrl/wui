import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Problems from '@/components/Problems';
import Features from '@/components/Features';
import AgentChat from '@/components/AgentChat';
import AgentEvolution from '@/components/AgentEvolution';
import Impact from '@/components/Impact';
import Screens from '@/components/Screens';
import Process from '@/components/Process';
import Trust from '@/components/Trust';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import { brand } from '@/content/proposal';

export default function Page() {
  return (
    <main className="bg-white text-ink-900">
      {/* 상단 안내선 — 서비스 소개 톤 */}
      <div className="bg-brand-50 border-b border-brand-100 text-brand-900 text-center text-xs py-2 px-4 no-print">
        {brand.proposalBanner}
      </div>
      <Nav />
      <Hero />
      <Problems />
      <Features />
      <AgentChat />
      <AgentEvolution />
      <Impact />
      <Screens />
      <Process />
      <Pricing />
      <Trust />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
