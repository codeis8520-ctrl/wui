import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Problems from '@/components/Problems';
import Features from '@/components/Features';
import AgentChat from '@/components/AgentChat';
import Impact from '@/components/Impact';
import Screens from '@/components/Screens';
import Process from '@/components/Process';
import Trust from '@/components/Trust';
// import Pricing from '@/components/Pricing'; // 월 구독 전환 시점에 재활성
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import { brand } from '@/content/proposal';

export default function Page() {
  return (
    <main className="bg-white text-ink-900">
      {/* 협의 단계임을 명시하는 상단 안내선 */}
      <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-center text-xs py-2 px-4 no-print">
        {brand.proposalBanner}
      </div>
      <Nav />
      <Hero />
      <Problems />
      <Features />
      <AgentChat />
      <Impact />
      <Screens />
      <Process />
      {/* <Pricing /> — 월 구독 단가는 본 제안 단계에서 노출하지 않음 */}
      <Trust />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
