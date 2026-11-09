export default function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="font-display text-3xl leading-tight text-forest sm:text-[2.4rem]">{title}</h2>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-ink/65">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
