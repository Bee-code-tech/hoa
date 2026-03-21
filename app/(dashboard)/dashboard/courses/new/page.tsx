"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { BookOpen, LayoutList, Trophy, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

import TitleForm from "../_components/modular/TitleForm"
import DescriptionForm from "../_components/modular/DescriptionForm"
import CategoryForm from "../_components/modular/CategoryForm"
import ImageForm from "../_components/modular/ImageForm"
import PriceForm from "../_components/modular/PriceForm"
import ChaptersForm from "../_components/modular/ChaptersForm"
import Actions from "../_components/modular/Actions"

const initialCourse = {
  title: "",
  description: "",
  image: "",
  category: "Security",
  price: "Free",
  modules: [],
  isPublished: false
}

export default function NewCoursePage() {
  const router = useRouter()
  const [course, setCourse] = useState(initialCourse)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem("new-course-draft")
    if (saved) {
      setCourse({ ...initialCourse, ...JSON.parse(saved) })
    }
  }, [])

  const updateCourse = (updates: any) => {
    const newCourse = { ...course, ...updates }
    setCourse(newCourse)
    localStorage.setItem("new-course-draft", JSON.stringify(newCourse))
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
    updateCourse({ modules: [...(course.modules || []), newChapter] })
  }

  const onReorderChapters = (updateData: any) => {
    updateCourse({ modules: [...(course.modules || [])] })
  }

  const onEditChapter = (id: string) => {
    router.push(`/dashboard/courses/new/modules/${id}`)
  }

  if (!isMounted) return null

  const requiredFields = [
    course.title,
    course.description,
    course.image,
    course.category,
    course.price,
    (course.modules || []).length > 0
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`
  const isComplete = requiredFields.every(Boolean)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
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
                  <BreadcrumbPage>New Course</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold tracking-tight">Course Setup</h1>
              <span className="text-sm text-muted-foreground">
                Complete all fields {completionText}
              </span>
            </div>
            <Actions 
               disabled={!isComplete} 
               isPublished={course.isPublished} 
               onPublish={() => updateCourse({ isPublished: !course.isPublished })}
               onDelete={() => {
                  localStorage.removeItem("new-course-draft")
                  router.push("/dashboard/courses")
               }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-x-2">
                <div className="bg-primary/10 p-2 rounded-xl">
                  <BookOpen className="size-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Customize course</h2>
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
                    <h2 className="text-xl font-semibold">Course modules</h2>
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
