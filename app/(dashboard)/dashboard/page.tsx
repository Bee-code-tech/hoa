import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { SectionCards } from "./_components/section-cards"
import { ChartAreaDefault } from "./_components/chart-area-default"
import { CourseDistributionChart } from "./_components/course-distribution-chart"
import { DataTable } from "./_components/data-table"
import { studentColumns } from "./_components/columns/student-columns"
import { RecentActivities } from "./_components/recent-activities"
import { InsightBox } from "./_components/insight-box"
import StudentOverview from "./_components/student-overview"

import data from "./data.json"

export default function Page() {
  // Simulate role check - In a real app this would come from an auth hook or session
  const userRole = "admin" // Switch to "student" to see student view

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
              
              {userRole === "admin" ? (
                <>
                  <SectionCards />
                  <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-3 lg:px-6">
                    <div className="lg:col-span-2">
                      <ChartAreaDefault />
                    </div>
                    <div className="lg:col-span-1">
                      <CourseDistributionChart />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 px-4 lg:px-6">
                    <h2 className="text-2xl font-bold tracking-tight">Student Management</h2>
                    <p className="text-muted-foreground">
                      Manage and track student enrollment, progress, and performance across all courses.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-12 lg:px-6 pb-20">
                    <div className="lg:col-span-8 overflow-hidden min-h-[900px]">
                      <DataTable columns={studentColumns} data={data} searchPlaceholder="Search students..." />
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-4 h-full">
                      <div className="flex-1 min-h-[450px]">
                        <RecentActivities />
                      </div>
                      <div className="flex-1 min-h-[440px]">
                        <InsightBox />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <StudentOverview />
              )}

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
