"use client";

import { useRef, useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { courseService, Course } from "@/services/course.service";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CoursesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getCourses();
        // Only show published courses on landing page
        setItems(data.filter(c => c.isPublished));
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useGSAP(() => {
    if (isLoading || items.length === 0) return;

    gsap.from(".courses-header", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".courses-header",
        start: "top 85%",
      }
    });

    gsap.from(".course-card-animated", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".courses-grid",
        start: "top 80%",
      }
    });
  }, { scope: containerRef, dependencies: [isLoading, items] });

  return (
    <section ref={containerRef} id="courses" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="courses-header mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">Our Courses</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Professional Security Training
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Industry-accredited courses designed to launch and advance your career in security.
          </p>
        </div>

        <div className="courses-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            // Skeleton state
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-card p-5 space-y-4 h-[400px]">
                <Skeleton className="h-48 w-full rounded-lg" />
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
            ))
          ) : (
            items.map((course) => (
              <div key={course.id || course.slug} className="course-card-animated">
                <CourseCard 
                  slug={course.slug || ""}
                  title={course.title}
                  category={course.category}
                  duration={course.duration || "Self-paced"}
                  students={course.students || "100+"}
                  price={course.price}
                  imageUrl={course.imageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"}
                  badge={course.badge}
                  paymentStatus={course.paymentStatus}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
