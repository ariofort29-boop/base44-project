export default function SectionHeading({
  eyebrow,
  title,
  text,
  action,
  align = 'left',
  tone = 'light',
  className = '',
}) {
  const isDark = tone === 'dark'
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end ${
        align === 'center' ? 'md:flex-col md:items-center md:text-center' : 'md:justify-between'
      } ${className}`}
    >
      <div className={`max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
        {eyebrow && (
          <p className={`eyebrow mb-3 ${isDark ? 'text-brand-300' : ''}`}>{eyebrow}</p>
        )}
        <h2
          className={`text-[1.65rem] leading-[1.15] tracking-[-0.02em] sm:text-4xl ${
            isDark ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
        {text && (
          <p className={`mt-4 text-[15px] leading-relaxed ${isDark ? 'text-brand-100/80' : 'text-muted'}`}>
            {text}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
