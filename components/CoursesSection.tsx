import CourseCard from "./CourseCard";
import { courses } from "@/data/courses";

const CoursesSection = () => {
  return (
    <section id="courses" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">Our Courses</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Professional Security Training
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Industry-accredited courses designed to launch and advance your career in security.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
