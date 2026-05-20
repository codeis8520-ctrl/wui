'use client';
import { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * 모바일 폰 프레임 안에서 동작하는 데모 모달.
 *
 * 모든 데모는 실제 구현될 화면과 동일한 UX·플로우를 따라야 한다.
 * - 버튼/탭/상태 전이는 실제 모바일 앱에서 그대로 재현 가능해야 함
 * - 외부 데이터/네트워크 없이 로컬 useState로 동작
 * - 모달 닫을 때 데모 상태는 자연스럽게 초기화 (key prop 활용)
 */
export default function InteractiveDemo({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  // ESC 키로 닫기 + body 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in-up no-print"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:w-auto sm:max-w-[920px] grid sm:grid-cols-[1fr_auto] gap-0 sm:gap-8 items-center px-4 py-6 sm:py-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 좌측: 데모 설명 (데스크탑만) */}
        <div className="hidden sm:block text-white max-w-sm">
          <p className="text-xs font-semibold tracking-wide text-amber-300 mb-2">실시간 인터랙티브 데모</p>
          <h3 className="text-3xl font-black leading-tight">{title}</h3>
          {subtitle && <p className="mt-3 text-white/70 leading-relaxed">{subtitle}</p>}
          <p className="mt-6 text-xs text-white/50 leading-relaxed">
            ※ 본 화면은 실제 구현 예정 UI와 동일한 흐름으로 동작합니다.<br />
            카메라·푸시는 모의 처리, 데이터·버튼은 실제 동작합니다.
          </p>
        </div>

        {/* 우측: 폰 프레임 */}
        <div className="mx-auto">
          {/* 모바일 헤더 (데스크탑에선 안 보임) */}
          <div className="sm:hidden text-white mb-3 px-1">
            <p className="text-xs font-semibold tracking-wide text-amber-300 mb-1">실시간 데모</p>
            <h3 className="text-xl font-black">{title}</h3>
          </div>

          <PhoneFrame>{children}</PhoneFrame>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-3 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[340px] h-[680px] bg-ink-900 rounded-[40px] p-3 shadow-2xl ring-1 ring-white/10">
      <div className="relative w-full h-full bg-white rounded-[28px] overflow-hidden flex flex-col">
        {/* 노치 */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-ink-900 rounded-b-2xl z-30" />
        {/* 상태 바 */}
        <div className="h-9 flex items-center justify-between px-6 text-[11px] font-semibold text-ink-700 shrink-0 bg-white z-20">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="text-[10px]">●●●●</span>
            <span>5G</span>
            <span>🔋</span>
          </span>
        </div>
        {/* 컨텐츠 영역 */}
        <div className="flex-1 overflow-y-auto">{children}</div>
        {/* 홈 인디케이터 */}
        <div className="h-6 flex items-center justify-center shrink-0 bg-white">
          <span className="w-32 h-1 bg-ink-900 rounded-full" />
        </div>
      </div>
    </div>
  );
}
