"use client"

import { useParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { CourseForm } from "../../_components/course-form"
import coursesData from "../../courses.json"

export default function EditCoursePage() {
  const params = useParams()
  const slug = params.slug

  const data = (coursesData as any).default || coursesData
  const course = Array.isArray(data) ? data.find((c: any) => c.slug === slug) : null

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
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6 lg:gap-6 max-w-5xl mx-auto w-full">
          {course ? (
            <CourseForm initialData={course} isEditing={true} />
          ) : (
            <div className="flex h-screen items-center justify-center flex-col gap-4">
              <h1 className="text-2xl font-bold text-primary">Course not found</h1>
              <p className="text-muted-foreground">The requested course slug "{slug}" does not exist.</p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
