'use client'

import { useCartStore } from '@/app/store/cart-store'
import { X } from 'lucide-react'

export function ShoppingCart() {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity,
    cartTotal
  } = useCartStore()

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-brand-secondary/50 backdrop-blur-sm"
            onClick={closeCart}
          />
          
          {/* Cart Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="flex h-full flex-col bg-brand-light shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-brand-secondary">Shopping Cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="-m-2 p-2 text-brand-secondary hover:text-brand-primary"
                        onClick={closeCart}
                      >
                        <span className="sr-only">Close panel</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {cart.length === 0 ? (
                        <div className="text-center py-12">
                          <svg className="mx-auto h-12 w-12 text-brand-secondary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-brand-secondary">No courses</h3>
                          <p className="mt-1 text-sm text-brand-secondary/70">Get started by adding some courses to your cart.</p>
                        </div>
                      ) : (
                        <ul className="-my-6 divide-y divide-brand-accent/20">
                          {cart.map((item) => (
                            <li key={item.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-brand-primary to-brand-secondary" />
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-brand-secondary">
                                    <h3>{item.title}</h3>
                                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex items-center">
                                    <button 
                                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                      className="px-2 py-1 text-brand-secondary hover:text-brand-primary"
                                    >
                                      -
                                    </button>
                                    <span className="mx-2 text-brand-secondary">{item.quantity}</span>
                                    <button 
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="px-2 py-1 text-brand-secondary hover:text-brand-primary"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button 
                                    type="button"
                                    onClick={() => removeFromCart(item.id)}
                                    className="font-medium text-brand-primary hover:text-brand-secondary"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-brand-accent/20 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-brand-secondary">
                      <p>Subtotal</p>
                      <p>${cartTotal().toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-brand-secondary/70">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <a
                        href="/checkout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-brand-primary px-6 py-3 text-base font-medium text-brand-light shadow-sm hover:bg-brand-secondary"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-brand-secondary/70">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="font-medium text-brand-primary hover:text-brand-secondary"
                          onClick={closeCart}
                        >
                          Continue Shopping<span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}