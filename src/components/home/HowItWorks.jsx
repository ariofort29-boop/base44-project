import Icon from '../icons.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import { STEPS } from '../../data/catalog.js'

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-40">
            <SectionHeading
              eyebrow="How wholesale works"
              title="From enquiry to container in four steps"
              text="No membership fees and no hidden margin. You speak directly with the manufacturer, while MR Store handles verification, quality and logistics."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/wholesale" icon="arrowRight">
                Start a request
              </Button>
              <Button to="/contact" variant="secondary">
                Talk to a buyer agent
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-line bg-mist p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand-700 shadow-sm">
                <Icon name="clock" className="h-5 w-5" />
              </span>
              <p className="text-[12.5px] leading-relaxed text-muted">
                Average first quotation: <span className="font-extrabold text-ink">31 hours</span> across
                2024 sourcing requests.
              </p>
            </div>
          </div>

          <ol className="relative space-y-3">
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                className="group relative flex gap-5 rounded-xl2 border border-line bg-white p-5 transition-all duration-500 hover:border-brand-200 hover:shadow-card sm:p-6"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 font-display text-[17px] font-semibold text-brand-800 transition group-hover:bg-brand-900 group-hover:text-white">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-[15.5px] font-extrabold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{step.text}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-3 left-[2.4rem] h-3 w-px bg-line"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
