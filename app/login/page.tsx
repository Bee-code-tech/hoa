'use client'

import { useState, useEffect } from 'react'
import { Logo } from '@/app/components/Logo'
import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  const [currentImage, setCurrentImage] = useState(0)
  
  // Sample images for the carousel - replace with actual image paths
  const images = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ]
  
  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <Logo className="h-10 w-auto" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-brand-primary relative hidden lg:block overflow-hidden">
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
                alt={`Login background ${index + 1}`}
                className="h-full w-full object-cover brightness-[0.3]"
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