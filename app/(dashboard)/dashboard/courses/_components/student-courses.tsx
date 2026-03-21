"use client"

import CourseCard from "@/components/CourseCard"
import coursesData from "../courses.json"

export function StudentCourseGrid() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Discover Your Next Course</h2>
        <p className="text-lg text-muted-foreground mt-2">Explore our range of professional security and safety certifications.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coursesData.map((course) => (
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
            showProgress={true}
          />
        ))}
      </div>
    </div>
  )
}
