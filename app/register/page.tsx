'use client'

import { useState, useEffect } from 'react'
import { Logo } from '@/app/components/Logo'

export default function RegisterPage() {
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
            <form className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold text-brand-light">Create an account</h1>
                <p className="text-brand-light/80 text-sm text-balance">
                  Enter your information below to create your account
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-light mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full px-3 py-2 border border-brand-accent/30 rounded-md focus:border-brand-accent focus:ring-brand-accent focus:outline-none bg-brand-secondary/20 text-brand-light placeholder-brand-light/70"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-light mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="w-full px-3 py-2 border border-brand-accent/30 rounded-md focus:border-brand-accent focus:ring-brand-accent focus:outline-none bg-brand-secondary/20 text-brand-light placeholder-brand-light/70"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-brand-light mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full px-3 py-2 border border-brand-accent/30 rounded-md focus:border-brand-accent focus:ring-brand-accent focus:outline-none bg-brand-secondary/20 text-brand-light placeholder-brand-light/70"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-brand-light mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full px-3 py-2 border border-brand-accent/30 rounded-md focus:border-brand-accent focus:ring-brand-accent focus:outline-none bg-brand-secondary/20 text-brand-light placeholder-brand-light/70"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-secondary py-2 px-4 rounded-md transition-colors duration-200"
              >
                Sign Up
              </button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-brand-light/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-brand-primary/90 text-brand-light/70">Or continue with</span>
                </div>
              </div>
              
              <button
                type="button"
                className="w-full border border-brand-accent/30 text-brand-light hover:bg-brand-accent/10 py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                  <path
                    d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                    fill="currentColor"
                  />
                </svg>
                Sign up with Google
              </button>
              
              <p className="text-center text-brand-light/80 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-brand-accent underline underline-offset-4 hover:text-brand-accent/80">
                  Log in
                </a>
              </p>
            </form>
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
              id="register-grid-pattern"
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
          <rect fill="url(#register-grid-pattern)" width="100%" height="100%" strokeWidth={0} />
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