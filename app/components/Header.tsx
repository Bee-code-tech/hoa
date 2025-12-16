'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/app/components/Button'
import { Container } from '@/app/components/Container'
import { Logo } from '@/app/components/Logo'
import { NavLink } from '@/app/components/NavLink'
import { ShoppingCart } from '@/app/components/ShoppingCart'
import { useCartStore } from '@/app/store/cart-store'
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react'

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 backdrop-blur-sm duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <PopoverPanel
        transition
        anchor="bottom end"
        className="relative z-10 mt-4 w-screen max-w-xs overflow-hidden rounded-3xl bg-white p-6 shadow-xl duration-200 data-[closed]:-translate-y-2 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="space-y-2">
          <MobileNavLink href="#features">Features</MobileNavLink>
          <MobileNavLink href="#courses">Courses</MobileNavLink>
          <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
          <MobileNavLink href="#pricing">Pricing</MobileNavLink>
        </div>
        <div className="mt-4 space-y-2">
          <MobileNavLink href="/login">Sign in</MobileNavLink>
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  const { cartCount, openCart } = useCartStore()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <Container>
        <nav className="relative z-50 flex justify-between py-4">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#courses">Courses</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <NavLink href="/login">Sign in</NavLink>
            </div>
            <button 
              onClick={openCart}
              className="relative p-2 rounded-full hover:bg-slate-100 transition-all duration-200 cursor-pointer"
            >
              <ShoppingCartIcon className="h-6 w-6 text-slate-700" />
              {cartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount()}
                </span>
              )}
            </button>
            <Button href="/register" color="blue">
              <span>
                Get started <span className="hidden lg:inline">today</span>
              </span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
      <ShoppingCart />
    </header>
  )
}