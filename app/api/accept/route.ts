import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/accept
 *  - 제안 수락 폼 제출 처리
 *  - SLACK_WEBHOOK_URL 또는 RESEND_API_KEY 둘 중 하나가 있으면 그쪽으로 전달
 *  - 둘 다 없으면 서버 로그만 남기고 200 (개발/시연 안전)
 */
export async function POST(req: NextRequest) {
  let body: AcceptBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const ok = validate(body);
  if (!ok.valid) return NextResponse.json({ error: 'validation', detail: ok.detail }, { status: 400 });

  const lines = [
    `📩 *도입 문의 접수*`,
    `매장: ${body.storeName}`,
    `사장님: ${body.contactName}`,
    `연락처: ${body.phone}`,
    body.memo ? `메모: ${body.memo}` : null,
    `시각: ${new Date().toISOString()}`,
  ].filter(Boolean);
  const text = lines.join('\n');

  const tasks: Promise<unknown>[] = [];

  const slack = process.env.SLACK_WEBHOOK_URL;
  if (slack) {
    tasks.push(
      fetch(slack, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  const from = process.env.NOTIFY_EMAIL_FROM || 'no-reply@owners.kr';
  if (resendKey && to) {
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to,
          subject: `[Owners] ${body.storeName} 도입 문의 접수`,
          text,
        }),
      })
    );
  }

  if (tasks.length === 0) {
    // 환경변수 없으면 서버 로그로라도 남김 (Vercel Functions Log에서 확인)
    console.log('[accept] no webhook configured — logging only:\n' + text);
  } else {
    // 결과는 기다리지만 실패해도 사용자 흐름은 막지 않음
    const results = await Promise.allSettled(tasks);
    results.forEach((r, i) => {
      if (r.status === 'rejected') console.error(`[accept] task ${i} failed`, r.reason);
    });
  }

  return NextResponse.json({ ok: true });
}

interface AcceptBody {
  storeName?: string;
  contactName?: string;
  phone?: string;
  memo?: string;
}

function validate(b: AcceptBody): { valid: boolean; detail?: string } {
  if (!b.storeName || b.storeName.length < 1) return { valid: false, detail: 'storeName required' };
  if (!b.contactName || b.contactName.length < 1) return { valid: false, detail: 'contactName required' };
  if (!b.phone || b.phone.length < 7) return { valid: false, detail: 'phone required' };
  if (b.memo && b.memo.length > 1000) return { valid: false, detail: 'memo too long' };
  return { valid: true };
}
