'use client';
import { useState } from 'react';
import { Camera, Check, ChevronLeft, Clock } from 'lucide-react';

/**
 * 사진 인증 체크리스트 데모.
 *
 * 실제 구현 매핑:
 *  - PhotoChecklistScreen.tsx의 동작과 1:1 일치
 *  - 카메라 버튼 → expo-image-picker 카메라 호출 (데모에선 placeholder)
 *  - 완료 버튼은 사진 촬영 후에만 활성화
 *  - 제출 시 백엔드 /api/checklists/submissions로 전송, 서버 truth 재조회
 */
type Task = { id: string; title: string; shift: '출근' | '미드' | '마감'; assignee: string };
type State = 'pending' | 'photo-taken' | 'done';

const INITIAL_TASKS: Task[] = [
  { id: 't1', title: '홀 바닥 청소 및 사진 인증', shift: '마감', assignee: '박서연' },
  { id: 't2', title: '냉장고 온도 확인 (영하 18도 이하)', shift: '마감', assignee: '김민준' },
  { id: 't3', title: '주방 후드·가스레인지 청소', shift: '마감', assignee: '김민준' },
  { id: 't4', title: '컵·식기 정리 및 위생 점검', shift: '마감', assignee: '박서연' },
  { id: 't5', title: '마감 정산 (POS 또는 엑셀 입력)', shift: '마감', assignee: '이준호' },
];

export default function ChecklistDemo() {
  const [states, setStates] = useState<Record<string, State>>({});
  const [active, setActive] = useState<string | null>(null);

  const setState = (id: string, s: State) => setStates((p) => ({ ...p, [id]: s }));

  const doneCount = Object.values(states).filter((s) => s === 'done').length;
  const progress = Math.round((doneCount / INITIAL_TASKS.length) * 100);

  if (active) {
    const task = INITIAL_TASKS.find((t) => t.id === active);
    if (!task) return null;
    const st = states[task.id] || 'pending';
    return (
      <TaskDetail
        task={task}
        state={st}
        onBack={() => setActive(null)}
        onTakePhoto={() => setState(task.id, 'photo-taken')}
        onSubmit={() => {
          setState(task.id, 'done');
          setActive(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="px-5 pt-4 pb-3 border-b border-ink-100 bg-white sticky top-0 z-10">
        <p className="text-[11px] text-ink-500 font-semibold">2026년 5월 20일 화요일 · 마감</p>
        <h1 className="text-lg font-black text-ink-900 mt-0.5">오늘 체크리스트</h1>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-2 bg-ink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-bold text-ink-700 tabular-nums">
            {doneCount}/{INITIAL_TASKS.length}
          </span>
        </div>
      </div>

      {/* 태스크 리스트 */}
      <div className="flex-1 px-4 py-3 space-y-2 bg-ink-50">
        {INITIAL_TASKS.map((task) => {
          const st = states[task.id] || 'pending';
          return (
            <button
              key={task.id}
              onClick={() => setActive(task.id)}
              className={`w-full text-left p-3 rounded-xl border transition flex items-center gap-3 ${
                st === 'done'
                  ? 'bg-brand-50 border-brand-100'
                  : 'bg-white border-ink-100 active:bg-ink-50'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-lg grid place-items-center text-xs shrink-0 ${
                  st === 'done'
                    ? 'bg-brand-600 text-white'
                    : st === 'photo-taken'
                    ? 'bg-amber-100 text-amber-700'
                    : 'border-2 border-ink-300 bg-white'
                }`}
              >
                {st === 'done' && <Check className="w-4 h-4" />}
                {st === 'photo-taken' && <Camera className="w-3.5 h-3.5" />}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[13px] font-semibold leading-tight ${
                    st === 'done' ? 'line-through text-ink-500' : 'text-ink-900'
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-[10px] text-ink-500 mt-0.5">
                  {task.assignee} · {task.shift}
                </p>
              </div>
              {st !== 'done' && <span className="text-[10px] text-brand-700 font-bold">›</span>}
            </button>
          );
        })}

        {progress === 100 && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-white text-center">
            <Check className="w-7 h-7 mx-auto mb-1" />
            <p className="font-bold">오늘 마감 100% 완료</p>
            <p className="text-xs text-white/70 mt-1">사장님께 자동으로 보고됐어요.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskDetail({
  task,
  state,
  onBack,
  onTakePhoto,
  onSubmit,
}: {
  task: Task;
  state: State;
  onBack: () => void;
  onTakePhoto: () => void;
  onSubmit: () => void;
}) {
  const canSubmit = state !== 'pending';
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-5 pt-4 pb-3 border-b border-ink-100 flex items-center gap-2 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft className="w-5 h-5 text-ink-700" />
        </button>
        <span className="text-[11px] text-ink-500 font-semibold flex-1">체크리스트 / {task.shift}</span>
      </div>

      <div className="flex-1 px-5 py-5">
        <h2 className="text-xl font-black text-ink-900 leading-tight">{task.title}</h2>
        <div className="mt-2 flex items-center gap-2 text-xs text-ink-500">
          <Clock className="w-3.5 h-3.5" />
          <span>담당: {task.assignee}</span>
        </div>

        <div className="mt-5 aspect-[4/3] rounded-2xl bg-ink-50 border-2 border-dashed border-ink-300 grid place-items-center overflow-hidden relative">
          {state === 'pending' ? (
            <div className="text-center text-ink-500">
              <Camera className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm font-semibold">사진 미촬영</p>
              <p className="text-[11px] mt-1">사진을 찍어야 완료 처리 됩니다</p>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-emerald-50 to-amber-50" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="text-4xl">📸</div>
                  <p className="text-[11px] text-ink-500 mt-2">방금 촬영한 사진</p>
                </div>
              </div>
              <span className="absolute top-2 right-2 text-[10px] bg-white/80 px-2 py-0.5 rounded-full font-semibold text-ink-700">
                방금 촬영
              </span>
            </>
          )}
        </div>

        <button
          onClick={onTakePhoto}
          className="w-full mt-4 py-3 rounded-xl border border-ink-300 bg-white hover:bg-ink-50 active:bg-ink-100 text-ink-900 font-semibold text-sm flex items-center justify-center gap-2 transition"
        >
          <Camera className="w-4 h-4" />
          {state === 'pending' ? '촬영하기' : '다시 촬영'}
        </button>

        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`w-full mt-2 py-3 rounded-xl font-bold text-sm transition ${
            canSubmit
              ? 'bg-brand-700 hover:bg-brand-800 text-white shadow-sm'
              : 'bg-ink-100 text-ink-300 cursor-not-allowed'
          }`}
        >
          {canSubmit ? '완료 처리' : '사진을 먼저 촬영해 주세요'}
        </button>

        <p className="text-[11px] text-ink-500 text-center mt-3 leading-relaxed">
          제출하면 사장님 대시보드에<br />사진과 완료 시각이 실시간으로 들어갑니다.
        </p>
      </div>
    </div>
  );
}
