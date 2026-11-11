import { CheckCircle2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useShop } from '../lib/store'

const emptyForm = {
  name: '',
  company: '',
  email: '',
  country: '',
  quantity: '',
  message: '',
}

export default function QuoteModal() {
  const { quoteTarget, closeQuote, addInquiry } = useShop()
  const [form, setForm] = useState(emptyForm)
  const [sent, setSent] = useState(false)

  const isOpen = quoteTarget !== null
  const product = quoteTarget && quoteTarget !== 'general' ? quoteTarget : null

  useEffect(() => {
    if (!isOpen) return
    setSent(false)
    setForm(emptyForm)
    const onKey = (event) => {
      if (event.key === 'Escape') closeQuote()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeQuote])

  if (!isOpen) return null

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    addInquiry(product ?? 'general')
    setSent(true)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-deep/55 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="استعلام قیمت عمده"
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-surface p-6 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          onClick={closeQuote}
          aria-label="بستن فرم استعلام"
          className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full text-sage/50 transition hover:bg-surface-2 hover:text-ivory"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="py-10 text-center">
            <CheckCircle2 size={44} className="mx-auto text-emerald-soft" />
            <h3 className="mt-4 text-xl font-bold text-ivory">درخواست شما ثبت شد</h3>
            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-[1.95] text-sage/60">
              تیم بازرگانی ما حداکثر تا یک روز کاری با شرایط قیمت عمده، نمونه و زمان تحویل
              {product ? ` برای ${product.nameFa ?? product.name}` : ''} پاسخ می‌دهد.
            </p>
            <button type="button" onClick={closeQuote} className="btn-primary mt-6">
              ادامه بررسی محصولات
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">
              <span className="h-px w-6 bg-gradient-to-r from-gold to-transparent" />
              استعلام قیمت عمده
            </p>
            <h3 className="mt-2 text-xl font-bold text-ivory">
              {product ? product.nameFa ?? product.name : 'نیاز خود را برای ما بنویسید'}
            </h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-sage/55">
              {product
                ? `${product.supplier} · ${product.countryFa ?? product.country}${
                    product.moqFa ? ` · حداقل سفارش ${product.moqFa}` : ''
                  }`
                : 'فهرست محصولات خود را بفرستید تا شما را به تأمین‌کنندگان معتبر متصل کنیم.'}
            </p>

            <form onSubmit={submit} className="mt-6 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="نام و نام خانوادگی"
                  aria-label="نام و نام خانوادگی"
                  className="field"
                />
                <input
                  required
                  value={form.company}
                  onChange={update('company')}
                  placeholder="نام شرکت"
                  aria-label="نام شرکت"
                  className="field"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="ایمیل کاری"
                  aria-label="ایمیل کاری"
                  className="field"
                />
                <input
                  value={form.country}
                  onChange={update('country')}
                  placeholder="کشور مقصد"
                  aria-label="کشور مقصد"
                  className="field"
                />
              </div>
              <input
                value={form.quantity}
                onChange={update('quantity')}
                placeholder="حجم تقریبی سفارش"
                aria-label="حجم تقریبی سفارش"
                className="field"
              />
              <textarea
                value={form.message}
                onChange={update('message')}
                rows={3}
                placeholder="بسته‌بندی، گواهی‌ها، شرایط تحویل…"
                aria-label="توضیحات"
                className="field resize-none"
              />
              <button type="submit" className="btn-primary w-full">
                ارسال استعلام
              </button>
              <p className="text-center text-[11px] text-sage/45">
                اطلاعات شما محرمانه می‌ماند و فقط با تأمین‌کننده انتخاب‌شده به اشتراک گذاشته می‌شود.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
