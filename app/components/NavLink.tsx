import Link from 'next/link'

export function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-2 py-1 text-sm text-brand-light hover:bg-brand-accent/20 hover:text-brand-light"
    >
      {children}
    </Link>
  )
}