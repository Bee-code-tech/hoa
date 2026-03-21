"use client"

import { useState } from "react"
import CourseCard from "@/components/CourseCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import coursesData from "../courses.json"

interface StudentCourseGridProps {
  initialData?: any[]
  isPersonalView?: boolean
}

export function StudentCourseGrid({ initialData, isPersonalView = false }: StudentCourseGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const data = initialData || (coursesData as any).default || coursesData
  
  const categories = ["All", ...new Set(data.map((c: any) => c.category))]

  const filteredCourses = data.filter((course: any) => {
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 border-b pb-6">
        <div className="flex items-center gap-2 mr-4 text-primary font-semibold text-sm">
          <Filter className="size-4" /> Filter by:
        </div>
        {categories.map((category: any) => (
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

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course: any) => (
            <CourseCard
              key={course.id}
              slug={course.slug}
              title={course.title}
              category={course.category}
              duration={course.duration}
              students={course.students}
              price={course.price}
              image={course.image}
              badge={course.badge}
              progress={course.progress}
              showProgress={isPersonalView}
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
