'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/app/components/Container'
import { SkeletonLoader } from '@/app/components/SkeletonLoader'

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    instructorTitle: "Senior Developer",
    rating: 4.8,
    reviews: 1240,
    price: 89.99,
    bestseller: true,
  },
  {
    id: 2,
    title: "Project Management Professional Certification",
    instructor: "Sarah Johnson",
    instructorTitle: "PMP Certified Trainer",
    rating: 4.9,
    reviews: 890,
    price: 129.99,
    bestseller: true,
  },
  {
    id: 3,
    title: "Advanced Data Analytics with Python",
    instructor: "Michael Chen",
    instructorTitle: "Data Science Lead",
    rating: 4.7,
    reviews: 650,
    price: 99.99,
    bestseller: false,
  },
];

export function PopularCourses() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 sm:py-32 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Popular Courses
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Most enrolled courses by our students
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            // Show skeleton loaders when loading
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : (
            // Show actual course cards when loaded
            courses.map((course) => (
              <div key={course.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-indigo-700" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-900">{course.instructor}</p>
                      <p className="text-sm text-slate-500">{course.instructorTitle}</p>
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{course.title}</h3>
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <svg 
                            key={rating} 
                            className={`h-5 w-5 ${rating < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-slate-500">({course.reviews})</span>
                    </div>
                    {course.bestseller && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-4">
                        Bestseller
                      </span>
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-900">${course.price}</span>
                    <Link 
                      href={`/courses/${course.id}`} 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}