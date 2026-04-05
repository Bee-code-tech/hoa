"use client"

import React, { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { StudentCourseGrid } from "../courses/_components/student-courses"
import { courses as coursesData } from "@/data/courses"

export default function MyCoursesPage() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || '{"role": "student"}')
    setRole(user.role)
  }, [])

  // Simulate enrolled courses (e.g. first two courses)
  const enrolledData = coursesData.slice(0, 2)

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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-8 px-4 lg:px-8">
               <div className="space-y-2 mb-6">
                 <h1 className="text-4xl font-extrabold tracking-tight text-primary">My Learning Journey</h1>
                 <p className="text-lg text-muted-foreground max-w-2xl">
                   Pick up where you left off and continue mastering your security certifications.
                 </p>
               </div>
               
               <StudentCourseGrid initialData={enrolledData} isPersonalView={true} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
