'use client'

import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'rounded-full bg-brand-primary py-2 px-4 text-sm font-semibold text-brand-light hover:bg-brand-secondary active:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 inline-flex items-center',
  secondary:
    'rounded-full bg-brand-light/20 py-2 px-4 text-sm font-medium text-brand-light hover:bg-brand-light/30 active:bg-brand-light/20 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 inline-flex items-center',
  outline:
    'rounded-full py-2 px-4 text-sm font-medium text-brand-light hover:text-brand-light active:bg-brand-light/10 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 border border-brand-light/30 inline-flex items-center',
  ghost:
    'text-brand-light hover:text-brand-light active:bg-brand-light/10 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 inline-flex items-center',
}

type VariantKey = keyof typeof variantStyles

const colorStyles = {
  primary: 'focus:ring-brand-primary focus:ring-offset-brand-light',
  accent: 'focus:ring-brand-accent focus:ring-offset-brand-light',
  light: 'focus:ring-brand-light focus:ring-offset-brand-primary',
}

type ColorKey = keyof typeof colorStyles

const baseStyles = 'transition-all duration-200 transform cursor-pointer hover:scale-105 active:scale-95'

export function Button({
  variant = 'primary',
  color = 'primary',
  className,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & {
  variant?: VariantKey
  color?: ColorKey
  href?: string
}) {
  const classes = clsx(
    baseStyles,
    variantStyles[variant],
    colorStyles[color],
    className
  )

  return href ? (
    <Link href={href} className={classes}>
      {props.children}
    </Link>
  ) : (
    <button className={classes} {...props} />
  )
}
