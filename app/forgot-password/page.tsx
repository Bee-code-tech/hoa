'use client'

import { useState, useEffect } from 'react'
import { Logo } from '@/app/components/Logo'

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  
  // Using the same images from the hero section
  const images = [
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80",
    "https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
  ]
  
  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [images.length])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send a password reset email
    setEmailSent(true)
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-brand-primary/90">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <Logo className="h-10 w-auto" />
          </a>
        </div>
        
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {emailSent ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-accent/20">
                  <svg className="h-6 w-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-brand-light">Check your email</h2>
                <p className="mt-2 text-brand-light/80">
                  We've sent a password reset link to your email address.
                </p>
                <div className="mt-6">
                  <a
                    href="/login"
                    className="text-brand-accent font-medium hover:text-brand-accent/80"
                  >
                    Back to login
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="text-2xl font-bold text-brand-light">Forgot password?</h1>
                  <p className="text-brand-light/80 text-sm text-balance">
                    No worries, we'll send you reset instructions.
                  </p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-light mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-3 py-2 border border-brand-accent/30 rounded-md focus:border-brand-accent focus:ring-brand-accent focus:outline-none bg-brand-secondary/20 text-brand-light placeholder-brand-light/70"
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-secondary py-2 px-4 rounded-md transition-colors duration-200"
                    >
                      Reset password
                    </button>
                  </div>
                </form>
                
                <div className="text-center">
                  <a
                    href="/login"
                    className="text-brand-accent font-medium hover:text-brand-accent/80"
                  >
                    ← Back to login
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative hidden lg:block overflow-hidden">
        {/* Gold grid pattern overlay */}
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-full w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-brand-accent/30"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="forgot-password-grid-pattern"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-brand-accent/10">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#forgot-password-grid-pattern)" width="100%" height="100%" strokeWidth={0} />
        </svg>
        
        {/* Carousel images */}
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Learning background ${index + 1}`}
                className="h-full w-full object-cover brightness-[0.6]"
              />
            </div>
          ))}
        </div>
        
        {/* Pagination dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentImage 
                  ? 'bg-brand-accent' 
                  : 'bg-brand-light/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}