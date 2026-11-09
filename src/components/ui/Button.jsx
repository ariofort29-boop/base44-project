import { Link } from 'react-router-dom'
import Icon from '../icons.jsx'

const variants = {
  primary:
    'bg-brand-900 text-white hover:bg-brand-800 shadow-[0_14px_30px_-16px_rgba(7,92,59,.9)]',
  secondary: 'bg-white text-brand-900 border border-brand-900/15 hover:border-brand-900/35 hover:bg-brand-50',
  ghost: 'text-brand-900 hover:bg-brand-50',
  light: 'bg-white text-brand-900 hover:bg-brand-50',
  outlineLight: 'border border-white/35 text-white hover:bg-white/10',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-3.5 text-sm',
}

export default function Button({
  as = 'button',
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
  ...rest
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 active:scale-[.985] ${variants[variant]} ${sizes[size]} ${className}`
  const inner = (
    <>
      {children}
      {icon && <Icon name={icon} className="h-4 w-4" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  }
  if (as === 'a' || href) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  )
}
