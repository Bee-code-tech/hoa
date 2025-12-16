'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/app/store/cart-store'
import { Container } from '@/app/components/Container'
import { SkeletonLoader } from '@/app/components/SkeletonLoader'
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react'

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'technology', name: 'Technology' },
  { id: 'business', name: 'Business' },
  { id: 'health-safety', name: 'Health & Safety' },
  { id: 'construction', name: 'Construction' },
  { id: 'security', name: 'Security' },
  { id: 'hospitality', name: 'Hospitality' },
];

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    category: "technology",
    instructor: "John Smith",
    instructorTitle: "Senior Developer",
    rating: 4.8,
    reviews: 1240,
    price: 89.99,
    bestseller: true,
    description: "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real projects and get hired."
  },
  {
    id: 2,
    title: "Project Management Professional Certification",
    category: "business",
    instructor: "Sarah Johnson",
    instructorTitle: "PMP Certified Trainer",
    rating: 4.9,
    reviews: 890,
    price: 129.99,
    bestseller: true,
    description: "Prepare for and pass the PMP exam with our comprehensive course. Includes 35 contact hours and exam prep materials."
  },
  {
    id: 3,
    title: "Advanced Data Analytics with Python",
    category: "technology",
    instructor: "Michael Chen",
    instructorTitle: "Data Science Lead",
    rating: 4.7,
    reviews: 650,
    price: 99.99,
    bestseller: false,
    description: "Learn advanced data analysis techniques using Python, pandas, NumPy, and visualization libraries."
  },
  {
    id: 4,
    title: "IOSH Managing Safely Course",
    category: "health-safety",
    instructor: "Robert Davis",
    instructorTitle: "Safety Consultant",
    rating: 4.6,
    reviews: 520,
    price: 149.99,
    bestseller: false,
    description: "Official IOSH Managing Safely certification course for managers and supervisors in any industry."
  },
  {
    id: 5,
    title: "CITB Site Management Safety Training Scheme",
    category: "construction",
    instructor: "James Wilson",
    instructorTitle: "Construction Safety Expert",
    rating: 4.8,
    reviews: 780,
    price: 199.99,
    bestseller: true,
    description: "SMSTS course for site managers and agents with responsibility for planning, organizing, monitoring, and controlling sites."
  },
  {
    id: 6,
    title: "Door Supervisor Course",
    category: "security",
    instructor: "Lisa Thompson",
    instructorTitle: "Security Training Director",
    rating: 4.5,
    reviews: 430,
    price: 179.99,
    bestseller: false,
    description: "SIA licensed door supervisor course for security personnel working in licensed premises."
  },
];

export function CourseCategories() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, cart, openCart } = useCartStore();
  
  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const handleAddToCart = (course: typeof courses[0]) => {
    addToCart({
      id: course.id,
      title: course.title,
      price: course.price
    });
    // Open the cart sidebar after adding an item
    setTimeout(() => {
      openCart();
    }, 0);
  };
  
  // Check if a course is already in the cart
  const isCourseInCart = (courseId: number) => {
    return cart.some(item => item.id === courseId);
  };

  return (
    <section id="courses" className="py-20 sm:py-32 bg-brand-light">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-brand-secondary sm:text-4xl">
            Browse Our Course Library
          </h2>
          <p className="mt-4 text-lg tracking-tight text-brand-secondary/80">
            Find the perfect course to advance your career
          </p>
        </div>
        
        {/* Category Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setIsLoading(true);
                setSelectedCategory(category.id);
                // Simulate loading when changing categories
                setTimeout(() => setIsLoading(false), 1000);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                selectedCategory === category.id
                  ? 'bg-brand-primary text-brand-light shadow-md'
                  : 'bg-brand-light text-brand-secondary border border-brand-accent/30 hover:bg-brand-accent/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Course Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            // Show skeleton loaders when loading
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : (
            // Show actual course cards when loaded
            filteredCourses.map((course) => {
              const inCart = isCourseInCart(course.id);
              
              return (
                <div 
                  key={course.id} 
                  className="flex flex-col overflow-hidden rounded-2xl border border-brand-accent/20 hover:border-brand-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-video bg-gradient-to-br from-brand-primary to-brand-secondary" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-brand-secondary">{course.instructor}</p>
                        <p className="text-sm text-brand-secondary/70">{course.instructorTitle}</p>
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-brand-secondary">{course.title}</h3>
                    <p className="mt-2 text-sm text-brand-secondary/80 line-clamp-2">{course.description}</p>
                    <div className="mt-4 flex items-center">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <svg 
                              key={rating} 
                              className={`h-4 w-4 ${rating < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-brand-secondary/70">({course.reviews})</span>
                      </div>
                      {course.bestseller && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-accent/20 text-brand-primary ml-4">
                          Bestseller
                        </span>
                      )}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-2xl font-bold text-brand-secondary">${course.price}</span>
                      <button 
                        onClick={() => handleAddToCart(course)}
                        disabled={inCart}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-brand-light transition-all duration-300 transform hover:scale-105 ${
                          inCart 
                            ? 'bg-brand-accent cursor-default' 
                            : 'bg-brand-primary hover:bg-brand-secondary cursor-pointer'
                        }`}
                      >
                        {inCart ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingCartIcon className="h-4 w-4 mr-2" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Container>
    </section>
  );
}