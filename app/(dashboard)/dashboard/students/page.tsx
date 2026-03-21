"use client"

import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { IconUsers, IconActivity, IconSchool, IconTrendingUp } from "@tabler/icons-react"

import { SectionCards, SectionCardItem } from "../_components/section-cards"
import { DataTable } from "../_components/data-table"
import { studentColumns } from "../_components/columns/student-columns"
import data from "../data.json"

export default function StudentsPage() {
  const stats: SectionCardItem[] = [
    {
      label: "Total Students",
      value: data.length,
      description: "Total registered accounts",
      footerLabel: "Steady growth this month",
      trend: { value: "+5.2%", isUp: true }
    },
    {
      label: "Active Students",
      value: data.filter(s => s.status === "Active").length,
      description: "Students currently in-platform",
      footerLabel: "High engagement today",
      trend: { value: "LIVE", isUp: true }
    },
    {
      label: "Completion Rate",
      value: "68%",
      description: "Based on completed modules",
      footerLabel: "Finishers trending up",
      trend: { value: "+2.1%", isUp: true }
    },
    {
      label: "New Enrollments",
      value: "12",
      description: "Last 7 days registration",
      footerLabel: "Strong weekly performance",
      trend: { value: "+10%", isUp: true }
    }
  ]

  return (
    <SidebarProvider
      style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              <SectionCards items={stats} />

              <div className="flex flex-col gap-2 px-4 lg:px-6">
                <h2 className="text-2xl font-bold tracking-tight">Student Management</h2>
                <p className="text-muted-foreground">
                  Complete administrative control over student records, enrollment status, and course progress.
                </p>
              </div>

              <div className="px-4 lg:px-6 pb-20">
                <DataTable 
                  columns={studentColumns} 
                  data={data} 
                  searchPlaceholder="Search students..."
                  addLabel="Add Student"
                />
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
