'use client'

import { useState } from 'react'
import { useCartStore } from '@/app/store/cart-store'
import { Button } from '@/app/components/Button'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleStripeRedirect = () => {
    setIsProcessing(true)
    // Simulate redirect to Stripe
    setTimeout(() => {
      // In a real implementation, this would redirect to Stripe
      alert('In a real implementation, this would redirect to Stripe payment page')
      setIsProcessing(false)
    }, 1000)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-light to-brand-accent/10 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-brand-light rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-brand-primary/10 to-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-brand-secondary mb-4">Your cart is empty</h1>
            <p className="text-brand-secondary/80 mb-8 text-lg">Add some courses to your cart before checking out.</p>
            <Link href="/">
              <Button variant="primary" color="primary" className="px-8 py-3 text-lg">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-brand-accent/10 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-brand-secondary mb-2">Review Your Order</h1>
        <p className="text-brand-secondary/80 mb-8">Please review your order details before proceeding to payment</p>
        
        <div className="bg-brand-light rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-brand-secondary mb-6 pb-2 border-b border-brand-accent/20">Order Summary</h2>
          
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-brand-accent/5 rounded-xl hover:bg-brand-accent/10 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg w-16 h-16 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-secondary">{item.title}</h3>
                    <p className="text-brand-secondary/70">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-brand-secondary">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-brand-accent/20 mt-6 pt-6">
            <div className="flex justify-between text-2xl font-bold text-brand-secondary">
              <span>Total</span>
              <span className="text-brand-primary">${cartTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link href="/">
            <Button variant="outline" color="primary" className="px-8 py-3 text-lg">
              ← Continue Shopping
            </Button>
          </Link>
          
          <Button 
            onClick={handleStripeRedirect}
            variant="primary" 
            color="primary" 
            className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Redirecting to Stripe...
              </div>
            ) : (
              `Proceed to Payment ($${cartTotal().toFixed(2)})`
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}