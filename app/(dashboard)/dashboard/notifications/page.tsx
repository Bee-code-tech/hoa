"use client"

import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { IconSend, IconUsers, IconCircleCheck, IconMessage, IconTrendingUp } from "@tabler/icons-react"

import { SectionCards, SectionCardItem } from "../_components/section-cards"
import { DataTable } from "../_components/data-table"
import { notificationColumns, NotificationLog } from "./_components/columns"
import NotificationForm from "./_components/NotificationForm"

const notificationData: NotificationLog[] = [
  {
    id: 1,
    date: "2024-03-21 14:30",
    segment: "All Students",
    type: "Announcement",
    subject: "Platform Maintenance Schedule",
    status: "Sent",
  },
  {
    id: 2,
    date: "2024-03-20 09:15",
    segment: "Paid Students",
    type: "Promotion",
    subject: "Exclusive 20% discount on Advanced SIA",
    status: "Sent",
  },
  {
    id: 3,
    date: "2024-03-19 11:00",
    segment: "Free Students",
    type: "Update",
    subject: "New free modules added to your account",
    status: "Sent",
  },
]

export default function NotificationsPage() {
  const stats: SectionCardItem[] = [
    {
      label: "Total Broadcasts",
      value: "24",
      description: "Historical outreach volume",
      footerLabel: "Active broadcasting",
      trend: { value: "+12%", isUp: true }
    },
    {
      label: "Total Recipients",
      value: "1,284",
      description: "Cumulative student reach",
      footerLabel: "High delivery rate",
      trend: { value: "99.8%", isUp: true }
    },
    {
      label: "Open Rate",
      value: "42.5%",
      description: "Based on last 5 broadcasts",
      footerLabel: "Steady engagement",
      trend: { value: "+2.5%", isUp: true }
    },
    {
      label: "Templates",
      value: "5",
      description: "Pre-configured layouts",
      footerLabel: "Ready to use",
      trend: { value: "NEW", isUp: true }
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
                <h2 className="text-2xl font-bold tracking-tight">Administrative Broadcasts</h2>
                <p className="text-muted-foreground">
                  Broadcast email notifications to your student segments and track engagement.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 lg:px-6">
                <div className="lg:col-span-8">
                   <NotificationForm />
                </div>
                
                <div className="lg:col-span-4 flex flex-col gap-4">
                   <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 h-full">
                      <h3 className="font-bold mb-2">Audience Segments</h3>
                      <div className="space-y-4 pt-2">
                         <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">All Students</span>
                            <span className="font-bold">1,284</span>
                         </div>
                         <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Paid Enrollments</span>
                            <span className="font-bold">412</span>
                         </div>
                         <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Free Tier</span>
                            <span className="font-bold">872</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 px-4 lg:px-6 mt-4">
                 <h2 className="text-2xl font-bold tracking-tight">Broadcast History</h2>
                 <p className="text-muted-foreground">
                    View and manage previously sent notifications.
                 </p>
              </div>
              
              <div className="px-4 lg:px-6 pb-20">
                <DataTable 
                  columns={notificationColumns} 
                  data={notificationData} 
                  searchPlaceholder="Search broadcasts..."
                />
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
