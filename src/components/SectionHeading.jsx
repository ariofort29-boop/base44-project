export default function SectionHeading({ eyebrow, title, description, action, tone = 'light' }) {
  const dark = tone === 'dark'
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="eyebrow">
            <span className="h-px w-7 bg-gradient-to-r from-gold to-transparent" />
            {eyebrow}
          </p>
        )}
        <h2
          className={`mt-3 text-2xl font-bold sm:text-[1.75rem] ${
            dark ? 'text-white' : 'text-navy'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-3 text-sm leading-[1.95] sm:text-[15px] ${
              dark ? 'text-white/60' : 'text-ink/60'
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
