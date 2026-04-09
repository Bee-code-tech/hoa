"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { 
  SidebarInset, 
  SidebarProvider,
  SidebarTrigger 
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb"
import { ArrowLeft, BookOpen, LayoutList, Trophy, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { courses as coursesData } from "@/data/courses"
import { Badge } from "@/components/ui/badge"

import TitleForm from "../../_components/modular/TitleForm"
import DescriptionForm from "../../_components/modular/DescriptionForm"
import CategoryForm from "../../_components/modular/CategoryForm"
import ImageForm from "../../_components/modular/ImageForm"
import PriceForm from "../../_components/modular/PriceForm"
import ChaptersForm from "../../_components/modular/ChaptersForm"
import Actions from "../../_components/modular/Actions"
import { courseService, Course, Chapter } from "@/services/course.service"
import { toast } from "react-hot-toast"

export default function EditCoursePage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  
  const [course, setCourse] = useState<Course | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourse(slug)
        setCourse(data)
      } catch (error) {
        toast.error("Failed to load course")
        router.push("/dashboard/courses")
      }
    }
    fetchCourse()
  }, [slug, router])

  const updateCourse = async (updates: Partial<Course>) => {
    const courseId = course?.id || course?._id
    if (!courseId) {
      console.error("No course ID found for update", course)
      toast.error("Error: Course identification failed")
      return
    }

    try {
      console.log("Updating course", courseId, updates)
      const updated = await courseService.updateCourse(courseId, updates)
      setCourse(updated)
      toast.success("Course updated")
    } catch (error) {
      console.error("Update failed", error)
      toast.error("Failed to update course")
    }
  }

  const onAddChapter = (title: string) => {
    if (!course) return
    const newChapter: Chapter = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      isPublished: false,
      isFree: false,
      type: "video" as const,
      content: "",
      position: (course.chapters || []).length
    }
    updateCourse({ chapters: [...(course.chapters || []), newChapter] })
  }

  const onReorderChapters = (chapters: Chapter[]) => {
    updateCourse({ chapters })
  }

  const onEditChapter = (id: string) => {
    router.push(`/dashboard/courses/${slug}/modules/${id}`)
  }

  if (!isMounted || !course) return null

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.category,
    course.price !== undefined,
    (course.chapters || []).some((c: any) => c.isPublished)
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`
  const isComplete = requiredFields.every(Boolean)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur sticky top-0 z-50">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/courses">Courses</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit Course</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {!course.isPublished && (
          <div className="bg-amber-50 border-b border-amber-200 p-4 flex items-center gap-x-2 text-amber-700 text-sm font-medium">
             <AlertTriangle className="size-4 shrink-0" />
             This course is unpublished. It will not be visible to students.
          </div>
        )}

        <div className="p-6 w-full pb-20">
          <Link 
            href="/dashboard/courses"
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to course list
          </Link>

          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Edit Course</h1>
              <div className="flex items-center gap-x-2">
                 <span className="text-sm text-muted-foreground mr-2">
                    Complete all fields {completionText}
                 </span>
                 {course.isPublished ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Published</Badge>
                 ) : (
                    <Badge variant="secondary">Draft</Badge>
                 )}
              </div>
            </div>
            <Actions 
               disabled={!isComplete} 
               isPublished={!!course.isPublished} 
               onPublish={async () => {
                  await updateCourse({ isPublished: !course.isPublished })
               }}
               onDelete={async () => {
                  const courseId = course.id || course._id
                  if (courseId) {
                    await courseService.deleteCourse(courseId)
                    toast.success("Course deleted")
                    router.push("/dashboard/courses")
                  }
               }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-x-2">
                <div className="bg-primary/10 p-2 rounded-xl">
                  <BookOpen className="size-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Course Details</h2>
              </div>
              
              <TitleForm 
                initialData={{ title: course.title || "" }} 
                onSave={(title) => updateCourse({ title })} 
              />
              <DescriptionForm 
                initialData={{ description: course.description || "" }} 
                onSave={(description) => updateCourse({ description })} 
              />
              <ImageForm 
                initialData={{ imageUrl: course.imageUrl || "" }} 
                onSave={(imageUrl) => updateCourse({ imageUrl })} 
              />
            </div>

            <div className="space-y-6">
               <div className="space-y-6">
                  <div className="flex items-center gap-x-2">
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <LayoutList className="size-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">Course Curriculum</h2>
                  </div>
                  <ChaptersForm 
                    initialData={{ 
                      chapters: (course.chapters || []).map(c => ({
                        id: c.id || c._id || "",
                        title: c.title,
                        isPublished: !!c.isPublished,
                        position: c.position,
                        type: c.type,
                        content: c.content,
                        isFree: !!c.isFree
                      }))
                    }} 
                    onSave={(chapters) => {
                      // Remove temp IDs and align with backend schema
                      const sanitized = chapters.map((chapter, index) => {
                        const { id, ...rest } = chapter;
                        return {
                          ...rest,
                          content: rest.content || " ", // Provide non-empty placeholder
                          position: index + 1, // Backend expects 1-indexed
                          isPublished: !!rest.isPublished,
                          isFree: !!rest.isFree,
                          ...(id.startsWith('temp-') ? {} : { id })
                        };
                      });
                      updateCourse({ chapters: sanitized as Chapter[] })
                    }}
                    onEdit={onEditChapter}
                  />
               </div>

               <div className="space-y-6 pt-6">
                  <div className="flex items-center gap-x-2">
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <Trophy className="size-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">Pricing and category</h2>
                  </div>
                  <PriceForm 
                    initialData={{ price: course.price || 0 }} 
                    onSave={(price) => updateCourse({ price })} 
                  />
                  <CategoryForm 
                    initialData={{ category: course.category || "" }} 
                    onSave={(category) => updateCourse({ category })} 
                  />
               </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
