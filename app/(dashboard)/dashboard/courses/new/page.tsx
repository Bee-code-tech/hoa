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
import { courseService, Course, Chapter } from "@/services/course.service"
import { toast } from "react-hot-toast"

const initialCourse: Course = {
  title: "",
  description: "",
  imageUrl: "",
  category: "Security",
  price: 0,
  chapters: [],
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

  const updateCourse = (updates: Partial<Course>) => {
    const newCourse = { ...course, ...updates }
    setCourse(newCourse)
    localStorage.setItem("new-course-draft", JSON.stringify(newCourse))
    
    // Check if we are editing an existing draft that was already synced to the server
    // If so, we might want to keep that sync, but the user requested "Save Changes" to be local only.
    // However, if we HAVE an id, it means it's already on the server.
    // The user said: "save changes should temporarily save the course fields in the local storage. when i finally click publish then it should create the course."
    // This implies that even if it HAS an id, we might want to delay sync? 
    // But usually once it's on the server, we want to keep it in sync.
    // Given the user's specific request, I will make it LOCAL ONLY until Publish.
  }

  // handleFirstSave is no longer needed as we create on Publish
  // I will keep a simplified version for the final publish step.

  const onAddChapter = (title: string) => {
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
    router.push(`/dashboard/courses/${course.id || 'new'}/modules/${id}`)
  }

  if (!isMounted) return null

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.category,
    course.price !== undefined,
    (course.chapters || []).length > 0 && (course.chapters || []).every(chapter => !!chapter.content)
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
               isPublished={!!course.isPublished}                onPublish={async () => {
                  try {
                    if (course.id) {
                      const updated = await courseService.updateCourse(course.id, { ...course, isPublished: !course.isPublished });
                      setCourse(updated);
                      toast.success(updated.isPublished ? "Course published" : "Course unpublished");
                    } else {
                      // Construct payload EXACTLY as requested by backend
                      const payload = {
                        title: course.title,
                        description: course.description,
                        imageUrl: course.imageUrl,
                        category: course.category,
                        price: Number(course.price || 0),
                        isPublished: true,
                        chapters: (course.chapters || []).map((chapter, index) => ({
                          title: chapter.title,
                          type: chapter.type,
                          content: chapter.content,
                          isFree: !!chapter.isFree,
                          isPublished: true, // Mark chapters as ready
                          position: index + 1 // Backend expects 1-indexed
                        }))
                      };
                      
                      console.log("Sending precise schema-compliant payload:", payload);
                      
                      // First time creation
                      const created = await courseService.createCourse(payload);
                      setCourse(created);
                      localStorage.removeItem("new-course-draft");
                      toast.success("Course created and published");
                      
                      // Use slug or fall back to ID for redirect
                      const target = created.slug || created.id || created._id;
                      router.push(`/dashboard/courses/${target}/edit`);
                    }
                  } catch (e: any) {
                    console.error("Backend Error - Status 400/500 Detail:", e.response?.data || e.message || e);
                    toast.error("Failed to update status");
                  }
               }}
               onDelete={async () => {
                  try {
                    if (course.id) {
                      await courseService.deleteCourse(course.id);
                      toast.success("Course deleted");
                    }
                    localStorage.removeItem("new-course-draft")
                    router.push("/dashboard/courses")
                  } catch (e) {
                    toast.error("Failed to delete course");
                  }
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
                    <h2 className="text-xl font-semibold">Course modules</h2>
                  </div>
                  <ChaptersForm 
                    initialData={{ 
                      chapters: (course.chapters || []).map(c => ({
                        id: c.id || "",
                        title: c.title,
                        isPublished: !!c.isPublished,
                        position: c.position,
                        type: c.type,
                        content: c.content || "",
                        isFree: !!c.isFree
                      }))
                    }} 
                    onSave={(chapters) => {
                      // Preserve IDs and remove 'temp-' prefix when saving to local draft
                      const sanitized = chapters.map(({ id, ...rest }) => ({
                        ...rest,
                        id: id.startsWith("temp-") ? id.replace("temp-", "local-") : id,
                        content: rest.content || "",
                        isFree: !!rest.isFree,
                        isPublished: !!rest.isPublished
                      }))
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
