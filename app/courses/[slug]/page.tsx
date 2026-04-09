import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Clock, Users, CheckCircle, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import EnrollButton from "@/components/EnrollButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { courseService, Course } from "@/services/course.service";

// Ensure the page is not staticly cached indefinitely so updates are visible
export const dynamic = "force-dynamic";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  try {
    const course = await courseService.getCourse(params.slug);
    
    if (!course) return { title: "Course Not Found" };

    const imageSrc = course.imageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c";

    return {
      title: `${course.title} | HOA`,
      description: course.description?.slice(0, 160),
      openGraph: {
        title: `${course.title} | House of Abundance`,
        description: course.description?.slice(0, 160),
        images: [{ url: imageSrc }],
      },
    };
  } catch (error) {
    return { title: "Course | HOA" };
  }
}

export default async function CourseDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  
  let course: Course;
  let allCourses: Course[] = [];

  try {
    const [fetchedCourse, fetchedAll] = await Promise.all([
      courseService.getCourse(slug),
      courseService.getCourses()
    ]);
    
    if (!fetchedCourse) notFound();
    course = fetchedCourse;
    allCourses = fetchedAll;
  } catch (error) {
    console.error("Failed to load course details:", error);
    notFound();
  }

  const relatedCourses = allCourses
    .filter((c) => (c.slug || c.id || c._id) !== (course.slug || course.id || course._id) && c.isPublished)
    .slice(0, 3);


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <section className="relative overflow-hidden bg-hero pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy-dark/95 to-navy/80" />
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.08) 40px, rgba(255,255,255,0.08) 41px)`
        }} />
        <div className="container relative mx-auto px-4">
          <Link href="/#courses" className="mb-6 inline-flex items-center gap-1.5 text-sm text-hero-muted transition-colors hover:text-hero-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Courses
          </Link>
          <div className="flex flex-col gap-3">
            {course.badge && (
              <span className="w-fit rounded-md bg-gold px-3 py-1 text-xs font-semibold text-primary-foreground">
                {course.badge}
              </span>
            )}
            <h1 className="text-3xl font-bold text-hero-foreground md:text-5xl">{course.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-hero-muted">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold" />{course.duration}</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-gold" />{course.students} enrolled</span>
              <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-gold" />{course.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left – Main content */}
            <div className="lg:col-span-2">
              {/* Course image */}
              <div className="mb-8 overflow-hidden rounded-xl border">
                <img src={course.imageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"} alt={course.title} className="h-72 w-full object-cover md:h-96" />
              </div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-foreground">About This Course</h2>
                <p className="leading-relaxed text-muted-foreground">{course.description}</p>
              </div>

              {/* Course Curriculum */}
              {course.chapters && course.chapters.length > 0 && (
                <div className="mb-10">
                  <h2 className="mb-4 text-2xl font-bold text-foreground">Course Curriculum</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {course.chapters.map((item, i: number) => (
                      <AccordionItem key={item.id || item._id || i} value={`item-${i}`}>
                        <AccordionTrigger className="text-left text-sm font-semibold">
                          <span className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-gold" />
                            {item.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          Module {i + 1} — {item.type === "video" ? "Video Lesson" : "PDF Resource"}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            {/* Right – Sidebar */}
            <div>
              <div className="sticky top-28 rounded-xl border bg-card p-6 shadow-sm">
                <p className="mb-1 text-3xl font-bold text-foreground">
                  {course.price === 0 ? "Free" : `£${course.price}`}
                </p>
                <p className="mb-6 text-sm text-muted-foreground">Full course fee — no hidden costs</p>

                <EnrollButton
                  courseId={(course._id || course.id || "")}
                  courseTitle={course.title}
                  coursePrice={String(course.price)}
                  paymentStatus={course.paymentStatus}
                  size="lg"
                  className="mb-3 w-full gap-2 bg-gold text-foreground hover:bg-gold-light"
                >
                  Enrol Now <ArrowRight className="h-4 w-4" />
                </EnrollButton>
                <Button size="lg" variant="outline" className="w-full border-muted-foreground/20">
                  Contact Us
                </Button>

                <div className="mt-6 border-t pt-6">
                  <h3 className="mb-3 text-sm font-semibold text-foreground">This course includes:</h3>
                  <ul className="space-y-2.5">
                    {(course.includes || [
                      "SIA Accredited Certification",
                      "Comprehensive Study Materials",
                      "Physical Intervention Training",
                      "Job Placement Support"
                    ]).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related courses */}
      <section className="border-t bg-muted/30 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Other Courses You May Like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCourses.map((c) => (
              <CourseCard 
                key={c.slug || c.id || c._id} 
                slug={c.slug || ""}
                title={c.title}
                category={c.category}
                duration={c.duration || "Self-paced"}
                students={c.students || "100+"}
                price={c.price}
                imageUrl={c.imageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"}
                badge={c.badge}
                paymentStatus={c.paymentStatus}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
