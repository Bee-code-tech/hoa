"use client"

import React, { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AdminCoursesTable } from "./_components/admin-courses"
import { StudentCourseGrid } from "./_components/student-courses"

export default function Page() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would be reactive to the user's role
    const user = JSON.parse(localStorage.getItem("user") || '{"role": "admin"}')
    setRole(user.role)
  }, [])

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
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
               {role === "admin" ? (
                 <AdminCoursesTable />
               ) : (
                 <div className="px-4 lg:px-6">
                    <StudentCourseGrid />
                 </div>
               )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
