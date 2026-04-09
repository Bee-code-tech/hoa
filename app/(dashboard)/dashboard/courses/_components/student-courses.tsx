"use client"

import { useState } from "react"
import CourseCard from "@/components/CourseCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter } from "lucide-react"
import { courseService, Course } from "@/services/course.service"
import { useEffect } from "react"
import { toast } from "react-hot-toast"

interface StudentCourseGridProps {
  initialData?: Course[]
  isPersonalView?: boolean
  isLoadingExternal?: boolean
}

export function StudentCourseGrid({ initialData, isPersonalView = false, isLoadingExternal = false }: StudentCourseGridProps) {
  const [courses, setCourses] = useState<Course[]>(initialData || [])
  const [isLoading, setIsLoading] = useState(!initialData)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    if (!initialData) {
      const fetchCourses = async () => {
        try {
          const data = await courseService.getCourses()
          setCourses(data)
        } catch (error) {
          toast.error("Failed to fetch courses")
        } finally {
          setIsLoading(false)
        }
      }
      fetchCourses()
    } else {
      setCourses(initialData)
    }
  }, [initialData])

  const categories = ["All", ...new Set(courses.map((c: Course) => c.category))]
  
  const filteredCourses = courses.filter((course: Course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || course.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-10">
      {!isPersonalView && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary">Discover Your Next Course</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Advance your career with our industry-leading certifications and professional training programs.
            </p>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
            <Input 
              placeholder="Search courses..." 
              className="pl-10 h-12 bg-card border-muted-foreground/20 rounded-xl shadow-sm focus:ring-gold"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 border-b pb-6">
        <div className="flex items-center gap-2 mr-4 text-primary font-semibold text-sm">
          <Filter className="size-4" /> Filter by:
        </div>
        {categories.map((category: string) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-6 transition-all duration-300 ${
              activeCategory === category 
                ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                : "hover:bg-gold hover:text-white hover:border-gold"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {isLoading || isLoadingExternal ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
             <div key={i} className="rounded-2xl border bg-card p-5 space-y-4 h-[400px]">
               <Skeleton className="h-48 w-full rounded-xl" />
               <Skeleton className="h-4 w-1/4" />
               <Skeleton className="h-6 w-3/4" />
               <div className="flex gap-4">
                 <Skeleton className="h-4 w-1/4" />
                 <Skeleton className="h-4 w-1/4" />
               </div>
               <div className="flex justify-between items-center pt-4 mt-auto">
                 <Skeleton className="h-8 w-20" />
                 <Skeleton className="h-10 w-32" />
               </div>
             </div>
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course: Course) => (
            <CourseCard
              key={course.id || course.slug}
              slug={course.slug || ""}
              title={course.title}
              category={course.category}
              duration={course.duration || "Self-paced"}
              students={course.students || "0"}
              price={course.price}
              imageUrl={course.imageUrl || "/images/placeholder.jpg"}
              badge={course.badge}
              progress={course.progress}
              showProgress={isPersonalView}
              paymentStatus={(course as any).paymentStatus ?? (isPersonalView ? "enrolled" : "none")}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
           <Search className="size-16 text-muted-foreground/30 mb-4" />
           <h3 className="text-xl font-bold text-primary">No courses found</h3>
           <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
           <Button variant="link" className="text-gold mt-2" onClick={() => {setSearchQuery(""); setActiveCategory("All");}}>
              Clear all filters
           </Button>
        </div>
      )}
    </div>
  )
}
