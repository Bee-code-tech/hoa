'use client'

import { useCartStore } from '@/app/store/cart-store'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/app/components/Button'
import { ShoppingCart as ShoppingCartIcon, X } from 'lucide-react'

export function ShoppingCart() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCartStore()

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => {
      if (!open) closeCart()
    }}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Shopping Cart</SheetTitle>
            <button 
              onClick={closeCart}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </SheetHeader>
        
        {cart.length === 0 ? (
          <div className="mt-8 text-center">
            <ShoppingCartIcon className="h-16 w-16 mx-auto text-slate-300" />
            <h3 className="mt-4 text-lg font-medium text-slate-900">Your cart is empty</h3>
            <p className="mt-1 text-slate-500">Start adding some courses to your cart</p>
          </div>
        ) : (
          <div className="mt-8">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-slate-200">
                {cart.map((item) => (
                  <li key={item.id} className="py-6 flex">
                    <div className="flex-shrink-0">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-slate-900">
                          <h3>{item.title}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-slate-500 hover:text-slate-600 p-1"
                          >
                            <span className="sr-only">Decrease quantity</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                          
                          <span className="mx-2 text-slate-500">Qty {item.quantity}</span>
                          
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-slate-500 hover:text-slate-600 p-1"
                          >
                            <span className="sr-only">Increase quantity</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          type="button" 
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-slate-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-slate-900">
                <p>Subtotal</p>
                <p>${cartTotal().toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Button href="/checkout" color="blue" className="w-full">
                  Checkout
                </Button>
              </div>
              <div className="mt-6 flex justify-center text-sm text-center text-slate-500">
                <button 
                  onClick={closeCart}
                  className="text-blue-600 font-medium hover:text-blue-500"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}