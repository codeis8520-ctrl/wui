import { footer, brand } from '@/content/proposal';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-ink-100 py-10">
      <div className="max-w-6xl mx-auto px-5 text-sm text-ink-500">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-bold text-ink-900">{footer.company}</span>
            <span>
              {footer.ceoLabel} {footer.ceoName}
            </span>
            <a
              href={`tel:${footer.phone.replace(/-/g, '')}`}
              className="hover:text-ink-900 tabular-nums"
            >
              {footer.phone}
            </a>
          </div>
          <div className="text-xs">
            © {footer.copyrightYear} {brand.name}. 본 제안서는 클라이언트 검토용으로 제작되었습니다.
          </div>
        </div>
      </div>
    </footer>
  );
}
