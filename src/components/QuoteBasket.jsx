import { ArrowRight, ListChecks, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useShop } from '../lib/store'

export default function QuoteBasket() {
  const { cartOpen, setCartOpen, inquiries } = useShop()

  if (!cartOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-navy-deep/45 backdrop-blur-sm">
      <button
        type="button"
        aria-label="بستن سبد استعلام"
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سبد استعلام"
        className="relative flex h-full w-full max-w-sm flex-col bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
          <div className="flex items-center gap-2 text-navy">
            <ListChecks size={18} className="text-emerald-brand" />
            <p className="text-base font-bold">سبد استعلام</p>
            <span className="rounded-full bg-mint px-2 py-0.5 text-xs font-semibold text-emerald-brand">
              {inquiries.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="بستن سبد استعلام"
            className="grid h-9 w-9 place-items-center rounded-full text-ink/50 hover:bg-mist hover:text-navy"
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {inquiries.length === 0 ? (
            <p className="mt-10 text-center text-[13px] leading-[1.95] text-ink/55">
              هنوز محصولی اضافه نشده است. با دکمه «تماس با ما» محصولات موردنظر را به فهرست استعلام
              خود اضافه کنید.
            </p>
          ) : (
            <ul className="space-y-3">
              {inquiries.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-navy/10 p-2.5"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="h-12 w-12 rounded-lg object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="grid h-12 w-12 place-items-center rounded-lg bg-mint text-[10px] font-semibold text-emerald-brand">
                      RFQ
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-navy">
                      {item.nameFa ?? item.name}
                    </p>
                    <p className="truncate text-[11px] text-ink/50">
                      {item.supplier ?? 'تأمین از شبکه MR Store'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-navy/10 px-5 py-4">
          <Link
            to="/contact"
            onClick={() => setCartOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-brand py-3 text-sm font-bold text-white transition hover:bg-botanical"
          >
            ثبت درخواست همکاری <ArrowRight size={15} />
          </Link>
          <p className="mt-2 text-center text-[10px] text-ink/45">
            قیمت همه اقلام به صورت استعلامی و پس از بررسی حجم سفارش اعلام می‌شود.
          </p>
        </div>
      </aside>
    </div>
  )
}
