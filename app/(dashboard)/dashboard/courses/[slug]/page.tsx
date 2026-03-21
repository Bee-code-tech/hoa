"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, PlayCircle, CheckCircle, Lock, FileText } from "lucide-react"
import coursesData from "../courses.json"

export default function CourseDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const course = coursesData.find((c) => c.slug === slug)

  const [activeLesson, setActiveLesson] = useState<any>(null)
  const [completedModules, setCompletedModules] = useState<string[]>([])

  useEffect(() => {
    if (course) {
      const saved = localStorage.getItem(`completed_modules_${course.id}`)
      if (saved) setCompletedModules(JSON.parse(saved))
      setActiveLesson(course.modules[0]?.lessons[0])
    }
  }, [course])

  if (!course) return <div>Course not found</div>

  const handleMarkComplete = (moduleId: string) => {
    const newCompleted = [...new Set([...completedModules, moduleId])]
    setCompletedModules(newCompleted)
    localStorage.setItem(`completed_modules_${course.id}`, JSON.stringify(newCompleted))
  }

  const isModuleLocked = (index: number) => {
    if (index < 2) return false
    const previousModuleId = course.modules[index - 1].id
    return !completedModules.includes(previousModuleId)
  }

  const currentModuleIndex = course.modules.findIndex(m => m.lessons.some(l => l.id === activeLesson?.id))
  const isCurrentModuleCompleted = currentModuleIndex !== -1 && completedModules.includes(course.modules[currentModuleIndex].id)

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
        <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6 bg-muted/30">
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
              <div className="p-4 bg-card border rounded-2xl shadow-sm">
                <h3 className="font-bold text-lg mb-4 px-2">Course Modules</h3>
                <div className="space-y-6">
                  {course.modules.map((module, index) => {
                    const locked = isModuleLocked(index)
                    const completed = completedModules.includes(module.id)
                    
                    return (
                      <div key={module.id} className="space-y-2">
                        <div className="flex items-center justify-between px-2">
                          <h4 className={`text-sm font-bold uppercase tracking-wider ${locked ? 'text-muted-foreground' : 'text-primary'}`}>
                            {module.title}
                          </h4>
                          {locked ? <Lock className="size-3 text-muted-foreground" /> : completed && <CheckCircle className="size-3 text-green-500" />}
                        </div>
                        <div className="space-y-1">
                          {module.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              disabled={locked}
                              onClick={() => setActiveLesson(lesson)}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${
                                activeLesson?.id === lesson.id
                                  ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                                  : locked 
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {lesson.type === 'video' ? (
                                <PlayCircle className="size-4 shrink-0" />
                              ) : (
                                <FileText className="size-4 shrink-0" />
                              )}
                              <span className="truncate flex-1 text-left">{lesson.title}</span>
                              {locked && <Lock className="size-3 ml-auto opacity-50" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Content: Content Player & Details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="aspect-video w-full overflow-hidden rounded-3xl bg-black border shadow-2xl relative">
                {activeLesson ? (
                  activeLesson.type === 'video' ? (
                    <iframe
                      className="w-full h-full"
                      src={activeLesson.content}
                      title={activeLesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-accent/10 p-12 text-center space-y-6">
                       <FileText className="size-20 text-primary opacity-20" />
                       <div className="max-w-md">
                         <h3 className="text-2xl font-bold mb-2">Reading Material</h3>
                         <p className="text-muted-foreground mb-8">{activeLesson.content}</p>
                         <Button variant="outline" className="gap-2">
                           <FileText className="size-4" /> Download PDF Guide
                         </Button>
                       </div>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    Select a lesson to start learning
                  </div>
                )}
              </div>

              <div className="bg-card border rounded-3xl p-6 lg:p-8 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="space-y-1">
                     <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-primary">
                      {activeLesson?.title || course.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                      {course.category} Certification
                    </p>
                   </div>
                  {currentModuleIndex !== -1 && !isCurrentModuleCompleted && (
                    <Button 
                      onClick={() => handleMarkComplete(course.modules[currentModuleIndex].id)}
                      className="gap-2 sm:w-fit"
                    >
                      <CheckCircle className="size-4" /> Mark Module Complete
                    </Button>
                  )}
                  {isCurrentModuleCompleted && (
                     <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full text-sm font-semibold border border-green-100">
                       <CheckCircle className="size-4" /> Module Completed
                     </div>
                  )}
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                  {course.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
