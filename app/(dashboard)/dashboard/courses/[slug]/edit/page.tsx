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

export default function EditCoursePage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  
  const [course, setCourse] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem(`edit-course-${slug}`)
    if (saved) {
      const parsed = JSON.parse(saved)
      setCourse({ modules: [], ...parsed })
    } else {
      const found = coursesData.find((c: any) => c.slug === slug)
      if (found) {
        setCourse(found)
      } else {
        router.push("/dashboard/courses")
      }
    }
  }, [slug])

  const updateCourse = (updates: any) => {
    const newCourse = { ...course, ...updates }
    setCourse(newCourse)
    localStorage.setItem(`edit-course-${slug}`, JSON.stringify(newCourse))
  }

  const onAddChapter = (title: string) => {
    const newChapter = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      isPublished: false,
      isFree: false,
      type: "video" as const,
      content: ""
    }
    const newModules = [...(course.modules || []), newChapter]
    updateCourse({ modules: newModules })
  }

  const onReorderChapters = (updateData: any) => {
    updateCourse({ modules: [...course.modules] })
  }

  const onEditChapter = (id: string) => {
    router.push(`/dashboard/courses/new/modules/${id}`)
  }

  if (!isMounted || !course) return null

  const requiredFields = [
    course.title,
    course.description,
    course.image,
    course.category,
    course.price,
    course.modules?.some((m: any) => m.isPublished)
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
               isPublished={course.isPublished} 
               onPublish={() => updateCourse({ isPublished: !course.isPublished })}
               onDelete={() => {
                  localStorage.removeItem(`edit-course-${slug}`)
                  router.push("/dashboard/courses")
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
                initialData={course} 
                onSave={(title) => updateCourse({ title })} 
              />
              <DescriptionForm 
                initialData={course} 
                onSave={(description) => updateCourse({ description })} 
              />
              <ImageForm 
                initialData={course} 
                onSave={(image) => updateCourse({ image })} 
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
                    initialData={{ chapters: course.modules || [] }} 
                    onAdd={onAddChapter}
                    onReorder={onReorderChapters}
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
                    initialData={course} 
                    onSave={(price) => updateCourse({ price })} 
                  />
                  <CategoryForm 
                    initialData={course} 
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
