import { footer, brand } from '@/content/proposal';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-ink-100 py-10">
      <div className="max-w-6xl mx-auto px-5 text-sm text-ink-500">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-bold text-ink-900">{footer.company}</span>
            <span className="ml-3">사업자 {footer.bizNo}</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <span>{footer.contactName}</span>
            <a href={`mailto:${footer.email}`} className="hover:text-ink-900">
              {footer.email}
            </a>
            <a href={`tel:${footer.phone}`} className="hover:text-ink-900">
              {footer.phone}
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs">
          © {footer.copyrightYear} {brand.name}. 본 제안서는 클라이언트 검토용으로 제작되었습니다.
        </p>
      </div>
    </footer>
  );
}
