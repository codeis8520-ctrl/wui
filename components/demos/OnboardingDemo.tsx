'use client';
import { useState } from 'react';
import { Lock, Check, ChevronLeft, Trophy, GraduationCap, Sparkles } from 'lucide-react';

/**
 * 신규 직원 자동 온보딩 데모.
 *
 * 실제 구현 매핑 (개발 예정):
 *  - OnboardingProgram, OnboardingChapter, UserOnboardingProgress 모델 추가 예정
 *  - 챕터별 콘텐츠는 사장님이 사진/텍스트/영상으로 등록 가능
 *  - 챕터 완료 = 퀴즈 통과 또는 사진 인증
 *  - 사장님 대시보드에서 직원별 진행률 확인
 *  - 모르는 SOP는 AI 비서에게 즉시 질문 가능 (search_knowledge 도구 활용)
 */

type Chapter = {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  content: string;
  quiz: {
    q: string;
    choices: string[];
    correct: number; // index
  };
};

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: '웨이 티하우스에 오신 것을 환영합니다',
    subtitle: '브랜드 철학 & 매장 소개',
    duration: '3분',
    content:
      '웨이 티하우스는 차의 시간을 천천히 느끼는 공간입니다. 손님이 음식을 기다리는 시간이 곧 차의 향을 음미하는 시간이 되도록, 모든 직원은 다음 3가지 원칙을 지킵니다.\n\n① 차는 손님 앞에서 우려냅니다.\n② 음식 서빙 전 차잔을 먼저 비웁니다.\n③ 마지막 한 잔까지 같은 농도로.',
    quiz: {
      q: '웨이 티하우스의 3가지 서비스 원칙 중 옳은 것은?',
      choices: [
        '차는 주방에서 미리 우려 둔다',
        '차는 손님 앞에서 우려낸다',
        '음식이 먼저, 차는 나중에',
      ],
      correct: 1,
    },
  },
  {
    id: 2,
    title: '시그니처 메뉴 6종 학습',
    subtitle: '메뉴별 재료·가격·제공 방식',
    duration: '8분',
    content:
      '닭볶음탕 / 연잎밥 정식 / 시그니처 티 세트 / 오미자차 / 솔잎차 / 발효차 디저트.\n\n특히 시그니처 티 세트는 손님이 직접 차를 우리는 과정을 안내해드려야 합니다.',
    quiz: {
      q: '시그니처 티 세트 서빙 시 직원이 해야 할 행동은?',
      choices: [
        '차를 미리 우려 컵에 따라드린다',
        '손님이 직접 우릴 수 있게 도구를 세팅하고 안내한다',
        '차 잎만 두고 나머지는 알아서 하시게 한다',
      ],
      correct: 1,
    },
  },
  {
    id: 3,
    title: '주문 받는 순서 & 응대',
    subtitle: '테이블 응대 매뉴얼',
    duration: '5분',
    content:
      '테이블 앉으신 후 1분 안에 메뉴 안내. 차 추천을 먼저 여쭙고, 음식은 그 다음. 알레르기 여부 항상 확인.',
    quiz: {
      q: '주문 받기 전 가장 먼저 확인해야 할 것은?',
      choices: ['알레르기 여부', '결제 수단', '식사 시간 여유'],
      correct: 0,
    },
  },
  {
    id: 4,
    title: '마감 청소 SOP',
    subtitle: '사진 인증 체크리스트 사용법',
    duration: '6분',
    content: '마감 체크리스트는 앱에서 확인합니다. 각 항목은 사진을 찍어야만 완료 처리됩니다.',
    quiz: {
      q: '마감 청소 체크리스트의 완료 조건은?',
      choices: ['눈으로 확인하면 OK', '사진을 찍어 앱에 등록해야 완료', '매니저 사인'],
      correct: 1,
    },
  },
];

type Stage = 'list' | 'reading' | 'quiz' | 'result';

export default function OnboardingDemo() {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>('list');
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const totalPoints = completed.size * 200;
  const progress = Math.round((completed.size / CHAPTERS.length) * 100);

  const openChapter = (id: number) => {
    setActive(id);
    setStage('reading');
    setSelected(null);
    setCorrect(null);
  };

  const submitQuiz = () => {
    if (selected === null || active === null) return;
    const ch = CHAPTERS.find((c) => c.id === active);
    if (!ch) return;
    const isCorrect = selected === ch.quiz.correct;
    setCorrect(isCorrect);
    if (isCorrect) {
      setCompleted((p) => new Set(p).add(active));
    }
    setStage('result');
  };

  // 챕터 리스트
  if (stage === 'list' || active === null) {
    return (
      <div className="flex flex-col h-full bg-ink-50">
        <div className="px-5 pt-4 pb-3 bg-white border-b border-ink-100 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-[11px] text-ink-500 font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>신규 직원 온보딩</span>
          </div>
          <h1 className="text-lg font-black text-ink-900 mt-0.5">박서연님, 환영합니다 👋</h1>
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span className="font-semibold text-ink-700">학습 진행률</span>
              <span className="font-bold text-ink-900 tabular-nums">
                {completed.size}/{CHAPTERS.length} 챕터
              </span>
            </div>
            <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-brand-700 font-bold mt-1.5">
              누적 +{totalPoints}p (챕터당 200p)
            </p>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2">
          {CHAPTERS.map((ch, idx) => {
            const isDone = completed.has(ch.id);
            const isLocked = idx > 0 && !completed.has(CHAPTERS[idx - 1].id);
            return (
              <button
                key={ch.id}
                onClick={() => !isLocked && openChapter(ch.id)}
                disabled={isLocked}
                className={`w-full text-left p-3 rounded-xl border transition flex items-center gap-3 ${
                  isLocked
                    ? 'bg-ink-100 border-ink-100 opacity-60 cursor-not-allowed'
                    : isDone
                    ? 'bg-brand-50 border-brand-100'
                    : 'bg-white border-ink-100 hover:border-brand-100'
                }`}
              >
                <span
                  className={`w-9 h-9 rounded-lg grid place-items-center text-sm font-bold shrink-0 ${
                    isLocked
                      ? 'bg-ink-300 text-white'
                      : isDone
                      ? 'bg-brand-600 text-white'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {isLocked ? <Lock className="w-4 h-4" /> : isDone ? <Check className="w-4 h-4" /> : ch.id}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[13px] font-bold leading-tight ${
                      isLocked ? 'text-ink-500' : 'text-ink-900'
                    }`}
                  >
                    {ch.title}
                  </p>
                  <p className="text-[11px] text-ink-500 mt-0.5">
                    {ch.subtitle} · {ch.duration}
                  </p>
                </div>
                {!isLocked && !isDone && (
                  <span className="text-[11px] font-bold text-brand-700">시작</span>
                )}
              </button>
            );
          })}

          {progress === 100 && (
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-white text-center">
              <Trophy className="w-8 h-8 mx-auto mb-1 text-amber-300" />
              <p className="font-bold">온보딩 완료!</p>
              <p className="text-[11px] text-white/70 mt-1">
                정직원으로서의 첫 출근, 준비 완료입니다.
              </p>
            </div>
          )}

          <div className="mt-3 p-3 rounded-xl bg-ink-900 text-white">
            <p className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AI 비서가 옆에 있어요
            </p>
            <p className="text-[11px] mt-1 leading-relaxed text-white/80">
              모르는 SOP나 메뉴는 AI 비서에게 바로 물어보세요. 매장 매뉴얼 기반으로 즉시 답해줍니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const ch = CHAPTERS.find((c) => c.id === active);
  if (!ch) return null;

  // 챕터 읽기
  if (stage === 'reading') {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="px-5 pt-4 pb-3 border-b border-ink-100 flex items-center gap-2 sticky top-0 bg-white z-10">
          <button
            onClick={() => {
              setActive(null);
              setStage('list');
            }}
            className="p-1 -ml-1"
          >
            <ChevronLeft className="w-5 h-5 text-ink-700" />
          </button>
          <span className="text-[11px] text-ink-500 font-semibold flex-1">
            챕터 {ch.id} / {CHAPTERS.length}
          </span>
        </div>
        <div className="flex-1 p-5 overflow-y-auto">
          <h2 className="text-xl font-black text-ink-900 leading-tight">{ch.title}</h2>
          <p className="text-[12px] text-ink-500 mt-1">{ch.subtitle} · {ch.duration}</p>
          <div className="mt-5 text-[14px] text-ink-700 leading-relaxed whitespace-pre-line">
            {ch.content}
          </div>
        </div>
        <div className="p-4 border-t border-ink-100">
          <button
            onClick={() => setStage('quiz')}
            className="w-full py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm transition"
          >
            퀴즈 풀기 →
          </button>
        </div>
      </div>
    );
  }

  // 퀴즈
  if (stage === 'quiz') {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="px-5 pt-4 pb-3 border-b border-ink-100 flex items-center gap-2 sticky top-0 bg-white z-10">
          <button onClick={() => setStage('reading')} className="p-1 -ml-1">
            <ChevronLeft className="w-5 h-5 text-ink-700" />
          </button>
          <span className="text-[11px] text-ink-500 font-semibold flex-1">퀴즈 · 챕터 {ch.id}</span>
        </div>
        <div className="flex-1 p-5">
          <p className="text-[10px] text-ink-500 font-semibold">한 문제만 풀어봐요</p>
          <h2 className="text-lg font-black text-ink-900 mt-1 leading-tight">{ch.quiz.q}</h2>
          <div className="mt-5 space-y-2">
            {ch.quiz.choices.map((c, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left p-3 rounded-xl border-2 transition flex items-center gap-3 ${
                    isSelected
                      ? 'border-brand-700 bg-brand-50'
                      : 'border-ink-100 bg-white hover:border-ink-300'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border-2 grid place-items-center text-[10px] font-bold shrink-0 ${
                      isSelected
                        ? 'border-brand-700 bg-brand-700 text-white'
                        : 'border-ink-300 text-ink-500'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-[13px] text-ink-900">{c}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-4 border-t border-ink-100">
          <button
            onClick={submitQuiz}
            disabled={selected === null}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition ${
              selected !== null
                ? 'bg-brand-700 hover:bg-brand-800 text-white'
                : 'bg-ink-100 text-ink-300 cursor-not-allowed'
            }`}
          >
            제출
          </button>
        </div>
      </div>
    );
  }

  // 결과
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 p-6 text-center grid place-items-center">
        <div>
          {correct ? (
            <>
              <div className="w-20 h-20 rounded-full bg-brand-100 grid place-items-center mx-auto mb-4">
                <Check className="w-10 h-10 text-brand-700" />
              </div>
              <h2 className="text-2xl font-black text-ink-900">정답이에요!</h2>
              <p className="text-[13px] text-ink-700 mt-2">챕터 {ch.id} 학습 완료</p>
              <p className="text-3xl font-black text-brand-700 mt-4">+200p</p>
              <p className="text-[11px] text-ink-500 mt-1">사장님께 진행률이 자동 보고됐어요.</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-rose-50 grid place-items-center mx-auto mb-4">
                <span className="text-3xl">😅</span>
              </div>
              <h2 className="text-2xl font-black text-ink-900">한 번 더 풀어볼까요?</h2>
              <p className="text-[13px] text-ink-700 mt-2">
                정답: <span className="font-bold">{ch.quiz.choices[ch.quiz.correct]}</span>
              </p>
              <p className="text-[11px] text-ink-500 mt-3 leading-relaxed">
                헷갈리는 부분은 챕터 본문을 다시 읽거나<br />AI 비서에게 물어보세요.
              </p>
            </>
          )}
        </div>
      </div>
      <div className="p-4 border-t border-ink-100 space-y-2">
        {correct ? (
          <button
            onClick={() => {
              setActive(null);
              setStage('list');
            }}
            className="w-full py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm transition"
          >
            챕터 목록으로
          </button>
        ) : (
          <>
            <button
              onClick={() => setStage('quiz')}
              className="w-full py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm transition"
            >
              다시 풀기
            </button>
            <button
              onClick={() => setStage('reading')}
              className="w-full py-3.5 rounded-xl bg-white border border-ink-300 text-ink-900 font-semibold text-sm transition"
            >
              본문 다시 읽기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
