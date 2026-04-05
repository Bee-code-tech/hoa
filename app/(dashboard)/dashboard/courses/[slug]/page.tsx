"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  PlayCircle, 
  CheckCircle, 
  Lock, 
  FileText, 
  Fullscreen, 
  Maximize2, 
  Minimize2,
  ExternalLink
} from "lucide-react"
import { courses as coursesData } from "@/data/courses"

export default function CourseDetailPage() {
  const params = useParams()
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug
  const router = useRouter()
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Robust data retrieval
  const course = Array.isArray(coursesData) ? coursesData.find((c: any) => c.slug === slug || String(c.id) === slug) : null
  
  const [activeModule, setActiveModule] = useState<any>(null)
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [isFocusMode, setIsFocusMode] = useState(false)

  useEffect(() => {
    if (course) {
      const saved = localStorage.getItem(`completed_modules_${course.id}`)
      if (saved) setCompletedModules(JSON.parse(saved))
      setActiveModule(course.modules[0])
    }
  }, [course])

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold text-primary">Course not found</h1>
        <p className="text-muted-foreground">The requested course slug "{slug}" does not exist.</p>
        <Button onClick={() => router.push("/dashboard/courses")}>Back to Courses</Button>
      </div>
    )
  }

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

  const toggleFullScreen = () => {
    if (!contentRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      contentRef.current.requestFullscreen()
    }
  }

  const activeModuleIndex = course.modules.findIndex((m: any) => m.id === activeModule?.id)
  const isActualModuleLocked = activeModuleIndex !== -1 && isModuleLocked(activeModuleIndex)
  const isCurrentModuleCompleted = activeModuleIndex !== -1 && completedModules.includes(course.modules[activeModuleIndex].id)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" className={isFocusMode ? "hidden" : ""} />
      <SidebarInset>
        {!isFocusMode && <SiteHeader />}
        <div className={`flex flex-1 flex-col gap-6 p-4 lg:p-6 bg-muted/30 transition-all duration-300 ${isFocusMode ? "lg:p-0" : ""}`}>
          {!isFocusMode && (
            <Button 
              variant="ghost" 
              className="w-fit gap-2 -ml-2" 
              onClick={() => router.back()}
            >
              <ChevronLeft className="size-4" /> Back to Courses
            </Button>
          )}

          <div className={`grid grid-cols-1 ${isFocusMode ? "lg:grid-cols-1" : "lg:grid-cols-12"} gap-8 h-full`}>
            {/* Left Sidebar: Flat Modules List */}
            <div className={`lg:col-span-4 space-y-4 ${isFocusMode ? "hidden" : "block"}`}>
              <div className="p-4 bg-card border rounded-2xl shadow-sm">
                <h3 className="font-bold text-lg mb-4 px-2">Course Curriculum</h3>
                <div className="space-y-1">
                  {course.modules.map((module: any, index: number) => {
                    const locked = isModuleLocked(index)
                    const completed = completedModules.includes(module.id)
                    const active = activeModule?.id === module.id
                    
                    return (
                      <button
                        key={module.id}
                        disabled={locked}
                        onClick={() => setActiveModule(module)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-all relative group ${
                          active
                            ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                            : locked 
                              ? "opacity-50 cursor-not-allowed bg-muted/50"
                              : "hover:bg-accent text-muted-foreground hover:text-foreground border border-transparent hover:border-primary/20"
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${active ? 'bg-white/20' : 'bg-muted group-hover:bg-white transition-colors'}`}>
                          {module.type === 'video' ? (
                            <PlayCircle className="size-4 shrink-0 transition-transform group-hover:scale-110" />
                          ) : (
                            <FileText className="size-4 shrink-0 transition-transform group-hover:scale-110" />
                          )}
                        </div>
                        <div className="flex flex-col items-start flex-1 truncate">
                          <span className="truncate font-medium">{module.title}</span>
                          <span className="text-[10px] uppercase tracking-wider opacity-70">
                            Module {index + 1} • {module.type}
                          </span>
                        </div>
                        {locked ? (
                          <Lock className="size-3 ml-auto opacity-50" />
                        ) : completed && (
                          <CheckCircle className="size-4 ml-auto text-green-500 fill-green-500/10" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Content: Content Player & Details */}
            <div className={`${isFocusMode ? "lg:col-span-1" : "lg:col-span-8"} space-y-6 h-full flex flex-col`}>
              {/* Toolbar for focus / fullscreen */}
              <div className="flex items-center justify-between bg-card border rounded-2xl px-4 py-2 shadow-sm shrink-0">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setIsFocusMode(!isFocusMode)}
                  >
                    {isFocusMode ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                    {isFocusMode ? "Exit Focus" : "Focus Mode"}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2"
                    onClick={toggleFullScreen}
                  >
                    <Fullscreen className="size-4" /> Fullscreen
                  </Button>
                </div>
                {activeModule?.type === 'pdf' && !isActualModuleLocked && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={activeModule.content} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <ExternalLink className="size-4" /> Open Original
                    </a>
                  </Button>
                )}
              </div>

              <div ref={contentRef} className={`aspect-video w-full overflow-hidden rounded-3xl bg-black border shadow-2xl relative transition-all duration-300 flex-1 ${isFocusMode ? "max-h-[85vh]" : ""}`}>
                {isActualModuleLocked ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-white p-8 text-center space-y-4">
                    <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                       <Lock className="size-10 text-gold animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold">This Module is Locked</h3>
                    <p className="text-white/60 max-w-sm">
                      Please complete the previous module ("{course.modules[activeModuleIndex - 1].title}") to unlock this content.
                    </p>
                    <Button variant="outline" className="text-white border-white/20 hover:bg-white/10" onClick={() => setActiveModule(course.modules[activeModuleIndex - 1])}>
                      Go to Previous Module
                    </Button>
                  </div>
                ) : activeModule ? (
                  activeModule.type === 'video' ? (
                    <iframe
                      className="w-full h-full"
                      src={activeModule.content}
                      title={activeModule.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <iframe
                      className="w-full h-full bg-white"
                      src={`https://docs.google.com/viewer?url=${encodeURIComponent(activeModule.content)}&embedded=true`}
                      title={activeModule.title}
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    Select a module to start learning
                  </div>
                )}
              </div>

              {!isFocusMode && (
                <div className="bg-card border rounded-3xl p-6 lg:p-8 space-y-6 shadow-sm shrink-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                     <div className="space-y-1">
                       <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-primary">
                        {activeModule?.title || course.title}
                      </h2>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                        {course.category} Certification • Module {activeModuleIndex + 1}
                      </p>
                     </div>
                    {activeModuleIndex !== -1 && !isCurrentModuleCompleted && !isActualModuleLocked && (
                      <Button 
                        onClick={() => handleMarkComplete(course.modules[activeModuleIndex].id)}
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
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}



