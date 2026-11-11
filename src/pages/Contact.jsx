import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { contactDetails } from '../data/catalog'

const initial = {
  name: '',
  company: '',
  email: '',
  country: '',
  interest: 'خرید محصولات عمده',
  message: '',
}

const lines = [
  { icon: Mail, label: 'ایمیل بازرگانی', value: contactDetails.email },
  { icon: Phone, label: 'تلفن', value: contactDetails.phone },
  { icon: MapPin, label: 'دفتر مرکزی', value: contactDetails.offices },
  { icon: Clock, label: 'زمان پاسخ', value: contactDetails.response },
]

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    setSent(true)
    setForm(initial)
  }

  return (
    <>
      <PageHeader
        eyebrow="تماس با ما"
        title="درباره سفارش بعدی شما صحبت کنیم"
        description="بگویید چه محصولی تأمین می‌کنید، چه حجمی نیاز دارید و بازار مقصد کجاست. مدیر بازرگانی ما با گزینه‌ها و شرایط پاسخ می‌دهد."
      />

      <section className="bg-surface-2 py-12 lg:py-16">
        <div className="container-page grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-line/10 bg-surface p-6 sm:p-8">
            {sent ? (
              <div className="py-12 text-center">
                <CheckCircle2 size={44} className="mx-auto text-emerald-soft" />
                <h2 className="mt-4 text-xl font-bold text-ivory">پیام شما ارسال شد</h2>
                <p className="mx-auto mt-2 max-w-sm text-[13px] leading-[1.95] text-sage/60">
                  سپاس از شما — تیم بازرگانی حداکثر تا یک روز کاری با گزینه‌های تأمین و شرایط قیمت
                  عمده پاسخ می‌دهد.
                </p>
                <button type="button" onClick={() => setSent(false)} className="btn-outline mt-6">
                  ارسال پیام دیگر
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold text-ivory">ثبت استعلام</h2>
                <p className="mt-1.5 text-[12px] text-sage/50">فیلدهای ستاره‌دار الزامی هستند.</p>
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-medium text-sage/60">
                        نام و نام خانوادگی *
                      </span>
                      <input required value={form.name} onChange={update('name')} className="field" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-medium text-sage/60">شرکت *</span>
                      <input
                        required
                        value={form.company}
                        onChange={update('company')}
                        className="field"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-medium text-sage/60">
                        ایمیل کاری *
                      </span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        className="field"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-medium text-sage/60">
                        کشور مقصد
                      </span>
                      <input
                        value={form.country}
                        onChange={update('country')}
                        className="field"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-medium text-sage/60">
                      موضوع درخواست
                    </span>
                    <select value={form.interest} onChange={update('interest')} className="field">
                      <option>خرید محصولات عمده</option>
                      <option>همکاری به‌عنوان تأمین‌کننده</option>
                      <option>تولید با برند اختصاصی</option>
                      <option>همکاری در توزیع</option>
                      <option>لجستیک و حمل تجمیعی</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-medium text-sage/60">پیام *</span>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="محصولات، حجم سفارش، بسته‌بندی، گواهی‌ها و شرایط تحویل…"
                      className="field resize-none"
                    />
                  </label>
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    ارسال استعلام
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-navy p-6 text-white">
              <p className="text-[10px] font-semibold text-gold/90">خطوط ارتباطی</p>
              <h2 className="mt-2 text-lg font-bold">گفتگو با مدیر بازرگانی</h2>
              <ul className="mt-5 space-y-3.5">
                {lines.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-gold-soft">
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="text-[10px] text-white/45">{label}</p>
                      <p className="text-[13px] text-white/85">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line/10 bg-surface p-6">
              <h3 className="text-base font-bold text-ivory">تأمین‌کنندگان</h3>
              <p className="mt-1.5 text-[13px] leading-[1.95] text-sage/60">
                کاتالوگ، گواهی‌ها و ظرفیت صادرات خود را بفرستید — تیم تأمین ما هر هفته تأمین‌کنندگان
                جدید را بررسی می‌کند.
              </p>
              <p className="mt-3 text-[13px] font-semibold text-emerald-soft">
                {contactDetails.suppliersEmail}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
