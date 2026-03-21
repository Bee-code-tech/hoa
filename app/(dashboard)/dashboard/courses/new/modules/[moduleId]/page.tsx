"use client"

import React, { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Eye, Video, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

import TitleForm from "../../../_components/modular/TitleForm"
import DescriptionForm from "../../../_components/modular/DescriptionForm"
import ChapterMediaForm from "../../../_components/modular/chapters/ChapterMediaForm"
import ChapterAccessForm from "../../../_components/modular/chapters/ChapterAccessForm"
import ChapterActions from "../../../_components/modular/chapters/ChapterActions"

const initialModule = {
  title: "",
  description: "",
  videoUrl: "",
  content: "",
  type: "video" as "video" | "pdf",
  isFree: false,
  isPublished: false,
  duration: 10,
}

export default function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>
}) {
  const { moduleId } = use(params)
  const router = useRouter()
  
  const [module, setModule] = useState(() => {
    if (typeof window !== "undefined") {
      // 1. Check if the module exists in the main course draft
      const savedCourse = localStorage.getItem("new-course-draft")
      if (savedCourse) {
        try {
          const courseData = JSON.parse(savedCourse)
          const courseModule = courseData.chapters?.find((c: any) => c.id === moduleId)
          if (courseModule) {
            // 2. Check for detailed module override
            const savedDetailed = localStorage.getItem(`module-detailed-${moduleId}`)
            if (savedDetailed) {
               return { ...initialModule, ...courseModule, ...JSON.parse(savedDetailed) }
            }
            return { ...initialModule, ...courseModule }
          }
        } catch (e) {
          console.error("Failed to parse course draft", e)
        }
      }
    }
    return initialModule
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`module-detailed-${moduleId}`, JSON.stringify(module))
      
      // Update the main course draft's chapter list too
      const savedCourse = localStorage.getItem("new-course-draft")
      if (savedCourse) {
        try {
          const courseData = JSON.parse(savedCourse)
          const chapIndex = courseData.chapters?.findIndex((c: any) => c.id === moduleId)
          if (chapIndex !== -1) {
            courseData.chapters[chapIndex].title = module.title
            courseData.chapters[chapIndex].isPublished = module.isPublished
            localStorage.setItem("new-course-draft", JSON.stringify(courseData))
          }
        } catch (e) {
          console.error("Failed to sync module to course draft", e)
        }
      }
    }
  }, [module, moduleId])

  const requiredFields = [
    module.title,
    module.description,
    module.videoUrl || module.content,
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const isComplete = requiredFields.every(Boolean)

  const updateModule = (values: Partial<typeof initialModule>) => {
    setModule((current: any) => ({ ...current, ...values }))
  }

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

        {!module.isPublished && (
          <div className="bg-yellow-100 dark:bg-yellow-900/30 border-b border-yellow-200 dark:border-yellow-800 px-6 py-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-300 font-medium">
              ⚠️ This module is unpublished and won't be visible in the curriculum player.
            </p>
          </div>
        )}

        <div className="flex flex-1 flex-col gap-6 p-6">
           <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
               <Link href="/dashboard/courses/new">
                  <Button variant="ghost" size="icon" className="mt-1">
                    <ArrowLeft className="size-5" />
                  </Button>
               </Link>
               <div className="flex flex-col gap-y-2">
                 <h1 className="text-3xl font-bold">Module Editor</h1>
                 <p className="text-sm text-muted-foreground">
                   Complete all fields ({completedFields}/{totalFields})
                 </p>
               </div>
            </div>
            <ChapterActions 
               disabled={!isComplete} 
               isPublished={module.isPublished}
               onPublish={() => updateModule({ isPublished: !module.isPublished })}
               onDelete={() => {
                  const savedCourse = localStorage.getItem("new-course-draft")
                  if (savedCourse) {
                    const courseData = JSON.parse(savedCourse)
                    courseData.chapters = courseData.chapters.filter((c: any) => c.id !== moduleId)
                    localStorage.setItem("new-course-draft", JSON.stringify(courseData))
                  }
                  localStorage.removeItem(`module-detailed-${moduleId}`)
                  router.push("/dashboard/courses/new")
               }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
             <div className="space-y-6">
                <div className="flex items-center gap-x-2">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <BookOpen className="size-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Module Customization</h2>
                </div>
                
                <TitleForm 
                  initialData={module} 
                  onSave={(title) => updateModule({ title })} 
                />
                <DescriptionForm 
                  initialData={module} 
                  onSave={(description) => updateModule({ description })} 
                />

                <div className="flex items-center gap-x-2 pt-6">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <Eye className="size-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Access Settings</h2>
                </div>
                <ChapterAccessForm 
                  initialData={module} 
                  onSave={(isFree) => updateModule({ isFree })} 
                />
             </div>

             <div className="space-y-6">
                <div className="flex items-center gap-x-2">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <Video className="size-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Media & Content</h2>
                </div>

                <div className="bg-primary/5 rounded-2xl border border-primary/10 p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        {module.type === 'video' ? <Video className="size-4 text-primary" /> : <FileText className="size-4 text-primary" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold">Content Type</p>
                        <p className="text-xs text-muted-foreground uppercase">{module.type}</p>
                      </div>
                   </div>
                   <Button variant="outline" size="sm" onClick={() => updateModule({ type: module.type === 'video' ? 'pdf' : 'video' })}>
                      Switch to {module.type === 'video' ? 'PDF' : 'Video'}
                   </Button>
                </div>

                <ChapterMediaForm 
                  initialData={{ videoUrl: module.videoUrl || module.content, type: module.type }} 
                  onSave={(url) => updateModule({ videoUrl: url, content: url })} 
                />

                <div className="p-6 bg-card border rounded-2xl space-y-4">
                   <div className="flex items-center gap-3">
                      <CheckCircle className="size-5 text-green-500" />
                      <h4 className="font-bold">Validation Status</h4>
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-muted-foreground">Title provided</span>
                         {module.title ? <Badge className="bg-green-500">YES</Badge> : <Badge variant="outline">NO</Badge>}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-muted-foreground">Description length</span>
                         {module.description.length > 10 ? <Badge className="bg-green-500">GOOD</Badge> : <Badge variant="outline">TOO SHORT</Badge>}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-muted-foreground">Media URL</span>
                         {module.videoUrl ? <Badge className="bg-green-500">VALID</Badge> : <Badge variant="outline">MISSING</Badge>}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
