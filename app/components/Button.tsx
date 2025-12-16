'use client'

import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'rounded-full bg-blue-600 py-2 px-4 text-sm font-semibold text-white hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  secondary:
    'rounded-full bg-slate-50 py-2 px-4 text-sm font-medium text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2',
  outline:
    'rounded-full py-2 px-4 text-sm font-medium text-slate-700 hover:text-slate-900 active:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2',
  ghost:
    'text-slate-700 hover:text-slate-900 active:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2',
}

type VariantKey = keyof typeof variantStyles

const colorStyles = {
  blue: 'focus:ring-blue-500 focus:ring-offset-blue-50',
  white: 'focus:ring-slate-500 focus:ring-offset-white',
  slate: 'focus:ring-slate-500 focus:ring-offset-slate-50',
}

type ColorKey = keyof typeof colorStyles

const baseStyles = 'transition-all duration-200 transform cursor-pointer hover:scale-105 active:scale-95'

export function Button({
  variant = 'primary',
  color = 'blue',
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