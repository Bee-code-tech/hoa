'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/app/components/Button'
import { Container } from '@/app/components/Container'
import { Logo } from '@/app/components/Logo'
import { NavLink } from '@/app/components/NavLink'
import { useCartStore } from '@/app/store/cart-store'
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react'
import { useState } from 'react'

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-brand-light"
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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <button
          type="button"
          className="relative z-50 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
          aria-label="Toggle Navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MobileNavIcon open={isOpen} />
        </button>
      </div>
      <div 
        className={clsx(
          'fixed left-0 right-0 top-18 z-40 origin-top bg-brand-primary backdrop-blur-3xl border-b border-brand-accent/50 transition-all duration-300 ease-in-out overflow-hidden',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 sm:px-6 py-8">
          <div className="flex flex-col space-y-6">
            <a href="#features" className="text-2xl font-medium text-brand-light hover:text-brand-accent transition-colors duration-200">Features</a>
            <a href="#courses" className="text-2xl font-medium text-brand-light hover:text-brand-accent transition-colors duration-200">Courses</a>
            <a href="#testimonials" className="text-2xl font-medium text-brand-light hover:text-brand-accent transition-colors duration-200">Testimonials</a>
            <a href="#pricing" className="text-2xl font-medium text-brand-light hover:text-brand-accent transition-colors duration-200">Pricing</a>
            <a href="/login" className="text-2xl font-medium text-brand-light hover:text-brand-accent transition-colors duration-200">Sign in</a>
            <Button href="/register" variant="outline" color="accent" className="w-full justify-center py-3 text-lg">
              Get started today
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const { cartCount, openCart } = useCartStore()

  return (
    <header className="sticky top-0 z-50 bg-brand-primary/90 backdrop-blur-xl border-b border-brand-accent/50">
      <Container>
        <nav className="relative z-50 flex justify-between py-4 items-center">
          <div className="flex items-center">
            <Link href="#" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:gap-x-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#courses">Courses</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
          </div>
          <div className="hidden md:flex md:items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <NavLink href="/login">Sign in</NavLink>
            </div>
            <button 
              onClick={openCart}
              className="relative p-2 rounded-full hover:bg-brand-accent/20 transition-all duration-200 cursor-pointer"
            >
              <ShoppingCartIcon className="h-6 w-6 text-brand-light" />
              {cartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-brand-secondary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount()}
                </span>
              )}
            </button>
            <Button href="/register" variant="outline" color="accent" className="hidden md:inline-flex">
              <span>
                Get started <span className="hidden lg:inline">today</span>
              </span>
            </Button>
          </div>
          {/* Mobile elements - shown only on mobile */}
          <div className="flex md:hidden items-center gap-4">
            <button 
              onClick={openCart}
              className="relative p-2 rounded-full hover:bg-brand-accent/20 transition-all duration-200 cursor-pointer"
            >
              <ShoppingCartIcon className="h-6 w-6 text-brand-light" />
              {cartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-brand-secondary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount()}
                </span>
              )}
            </button>
            <div className="relative">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}