"use client"

import React, { use, useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Eye, Video, FileText, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { toast } from "react-hot-toast"

import TitleForm from "../../../_components/modular/TitleForm"
import DescriptionForm from "../../../_components/modular/DescriptionForm"
import ChapterMediaForm from "../../../_components/modular/chapters/ChapterMediaForm"
import ChapterAccessForm from "../../../_components/modular/chapters/ChapterAccessForm"
import ChapterActions from "../../../_components/modular/chapters/ChapterActions"
import { courseService, Course, Chapter } from "@/services/course.service"

export default function ModuleEditPage() {
  const params = useParams()
  const slug = params.slug as string
  const moduleId = params.moduleId as string
  const router = useRouter()
  
  const [course, setCourse] = useState<Course | null>(null)
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const courseData = await courseService.getCourse(slug)
        setCourse(courseData)
        const foundChapter = courseData.chapters?.find(c => c.id === moduleId || c._id === moduleId)
        if (foundChapter) {
          setChapter(foundChapter)
        } else {
          toast.error("Module not found")
          router.push(`/dashboard/courses/${slug}/edit`)
        }
      } catch (error) {
        toast.error("Failed to load module data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [slug, moduleId, router])

  const onUpdate = async (updates: Partial<Chapter>) => {
    const courseId = course?.id || course?._id
    if (!courseId || !chapter) {
      console.error("Missing course ID or chapter", { courseId, chapter })
      return
    }

    try {
      console.log("Updating chapter", chapter.id || chapter._id, "in course", courseId, updates)
      const updatedChapters = (course.chapters || []).map(c => {
        if (c.id === moduleId || c._id === moduleId) {
          return { ...c, ...updates }
        }
        return c
      })
      
      const updatedCourse = await courseService.updateCourse(courseId, {
        chapters: updatedChapters
      })
      
      setCourse(updatedCourse)
      const freshChapter = (updatedCourse.chapters || []).find(c => c.id === moduleId || c._id === moduleId)
      if (freshChapter) setChapter(freshChapter)
      
      toast.success("Module updated")
    } catch (error) {
      console.error("Module update failed", error)
      toast.error("Failed to update module")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!chapter) return null

  const requiredFields = [
    chapter.title,
    chapter.content,
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const isComplete = requiredFields.every(Boolean)

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

        {!chapter.isPublished && (
          <div className="bg-yellow-100 dark:bg-yellow-900/30 border-b border-yellow-200 dark:border-yellow-800 px-6 py-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-300 font-medium">
              ⚠️ This module is unpublished and won't be visible in the curriculum player.
            </p>
          </div>
        )}

        <div className="flex flex-1 flex-col gap-6 p-6">
           <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
               <Link href={`/dashboard/courses/${slug}/edit`}>
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
               isPublished={!!chapter.isPublished}
               onPublish={() => onUpdate({ isPublished: !chapter.isPublished })}
               onDelete={async () => {
                  const courseId = course?.id || course?._id
                  console.log("Attempting to delete module", moduleId, "from course", courseId)
                  if (!courseId) return
                  try {
                    const filtered = (course.chapters || []).filter(c => c.id !== moduleId && c._id !== moduleId)
                    await courseService.updateCourse(courseId, { chapters: filtered })
                    toast.success("Module deleted")
                    router.push(`/dashboard/courses/${slug}/edit`)
                  } catch (e) {
                    console.error("Delete failed", e)
                    toast.error("Failed to delete module")
                  }
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
                  initialData={chapter} 
                  onSave={(title) => onUpdate({ title })} 
                />
                <DescriptionForm 
                  initialData={{ description: "" }} // Added description if missing in schema
                  onSave={(description) => console.log("Description:", description)} 
                />

                <div className="flex items-center gap-x-2 pt-6">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <Eye className="size-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Access Settings</h2>
                </div>
                <ChapterAccessForm 
                  initialData={{ isFree: !!chapter.isFree }} 
                  onSave={(isFree) => onUpdate({ isFree })} 
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
                        {chapter.type === 'video' ? <Video className="size-4 text-primary" /> : <FileText className="size-4 text-primary" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold">Content Type</p>
                        <p className="text-xs text-muted-foreground uppercase">{chapter.type}</p>
                      </div>
                   </div>
                   <Button variant="outline" size="sm" onClick={() => onUpdate({ type: chapter.type === 'video' ? 'pdf' : 'video' })}>
                      Switch to {chapter.type === 'video' ? 'PDF' : 'Video'}
                   </Button>
                </div>

                <ChapterMediaForm 
                  initialData={{ videoUrl: chapter.content, type: chapter.type }} 
                  onSave={(url) => onUpdate({ content: url })} 
                />

                <div className="p-6 bg-card border rounded-2xl space-y-4">
                   <div className="flex items-center gap-3">
                      <CheckCircle className="size-5 text-green-500" />
                      <h4 className="font-bold">Validation Status</h4>
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-muted-foreground">Title provided</span>
                         {chapter.title ? <Badge className="bg-green-500">YES</Badge> : <Badge variant="outline">NO</Badge>}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-muted-foreground">Media content</span>
                         {chapter.content ? <Badge className="bg-green-500">VALID</Badge> : <Badge variant="outline">MISSING</Badge>}
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
