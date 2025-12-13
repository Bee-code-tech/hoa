'use client'

import React from 'react'

export function SkeletonLoader() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-blue-200 to-indigo-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-30"></div>
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        {/* Instructor info */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="bg-slate-200 rounded-xl w-10 h-10" />
          </div>
          <div className="ml-3">
            <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-16"></div>
          </div>
        </div>
        
        {/* Title */}
        <div className="mt-4">
          <div className="h-5 bg-slate-200 rounded w-4/5 mb-2"></div>
          <div className="h-5 bg-slate-200 rounded w-3/5"></div>
        </div>
        
        {/* Description */}
        <div className="mt-3">
          <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-4/5"></div>
        </div>
        
        {/* Rating and bestseller */}
        <div className="mt-4 flex items-center">
          <div className="flex items-center">
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-4 bg-slate-200 rounded"></div>
              ))}
            </div>
            <div className="h-3 bg-slate-200 rounded w-10 ml-2"></div>
          </div>
          <div className="h-5 bg-slate-200 rounded-full w-16 ml-4"></div>
        </div>
        
        {/* Price and button */}
        <div className="mt-6 flex items-center justify-between">
          <div className="h-6 bg-slate-200 rounded w-12"></div>
          <div className="h-8 bg-slate-200 rounded-md w-24"></div>
        </div>
      </div>
    </div>
  )
}