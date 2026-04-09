"use client"

import React, { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { StudentCourseGrid } from "../courses/_components/student-courses"
import { courseService, Course } from "@/services/course.service"
import { Loader2 } from "lucide-react"

export default function MyCoursesPage() {
  const [role, setRole] = useState<string | null>(null)
  const [enrolledData, setEnrolledData] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || '{"role": "student"}')
    setRole(user.role)

    const fetchCourses = async () => {
      try {
        const data = await courseService.getCourses();
        const enrolled = data.filter(c => ["enrolled", "paid", "confirmed"].includes(c.paymentStatus as string));
        setEnrolledData(enrolled);
      } catch (error) {
        console.error("Failed to load enrolled courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
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
            <div className="flex flex-col gap-4 py-8 px-4 lg:px-8">
               <div className="space-y-2 mb-6">
                 <h1 className="text-4xl font-extrabold tracking-tight text-primary">My Learning Journey</h1>
                 <p className="text-lg text-muted-foreground max-w-2xl">
                   Pick up where you left off and continue mastering your security certifications.
                 </p>
               </div>
               
               {isLoading || enrolledData.length > 0 ? (
                 <StudentCourseGrid initialData={enrolledData} isPersonalView={true} isLoadingExternal={isLoading} />
               ) : (
                 <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-muted-foreground/20">
                   <h3 className="text-xl font-bold mb-2">No active enrollments yet.</h3>
                   <p className="text-muted-foreground">Once your payment is confirmed, your courses will appear here.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
