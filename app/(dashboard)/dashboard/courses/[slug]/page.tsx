"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, PlayCircle, CheckCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import coursesData from "../courses.json"

export default function CourseDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const course = coursesData.find((c) => c.slug === slug)

  const [activeLesson, setActiveLesson] = useState(
    course?.modules[0]?.lessons[0] || null
  )

  if (!course) return <div>Course not found</div>

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
          <Button 
            variant="ghost" 
            className="w-fit gap-2 -ml-2" 
            onClick={() => router.back()}
          >
            <ChevronLeft className="size-4" /> Back to Courses
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar: Modules & Lessons */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 bg-card border rounded-xl overflow-hidden">
                <h3 className="font-bold text-lg mb-4">Course Content</h3>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                  {course.modules.map((module, mIndex) => (
                    <AccordionItem key={module.id} value={`item-${mIndex}`} border-0>
                      <AccordionTrigger className="hover:no-underline py-3 px-4 bg-muted/50 rounded-lg mb-2">
                        <span className="text-sm font-semibold">{module.title}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-2 px-2">
                        <div className="space-y-1">
                          {module.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() => setActiveLesson(lesson)}
                              className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${
                                activeLesson?.id === lesson.id
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-muted"
                              }`}
                            >
                              {activeLesson?.id === lesson.id ? (
                                <PlayCircle className="size-4 shrink-0" />
                              ) : (
                                <CheckCircle className="size-4 shrink-0 text-muted-foreground" />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Right Content: Video Player & Details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black border shadow-xl relative group">
                {activeLesson ? (
                  <iframe
                    className="w-full h-full"
                    src={activeLesson.videoUrl}
                    title={activeLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    Select a lesson to start learning
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-bold tracking-tight">
                    {activeLesson?.title || course.title}
                  </h2>
                  <Button variant="outline" size="sm">Mark as Complete</Button>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
