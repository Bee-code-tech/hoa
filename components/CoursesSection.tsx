"use client";

import { useRef } from "react";
import CourseCard from "./CourseCard";
import { courses } from "@/data/courses";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CoursesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
  }, { scope: containerRef });

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
          {courses.map((course) => (
            <div key={course.title} className="course-card-animated">
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
