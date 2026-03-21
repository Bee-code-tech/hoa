"use client"

import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { 
  SidebarInset, 
  SidebarProvider,
  SidebarTrigger 
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb"

import NotificationStats from "./_components/NotificationStats"
import NotificationForm from "./_components/NotificationForm"
import NotificationHistory from "./_components/NotificationHistory"

export default function NotificationsPage() {
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
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur sticky top-0 z-50 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Notifications</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-1 flex-col gap-8 p-6 pb-20 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Administrative Broadcasts</h1>
            <p className="text-sm text-muted-foreground">
              Broadcast email notifications to your student segments and track engagement.
            </p>
          </div>

          <NotificationStats />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 xl:col-span-8">
               <NotificationForm />
            </div>
            
            <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-4">
               <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
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
                  <Separator className="my-6 bg-primary/10" />
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                     Segments are updated in real-time based on current student status in the database.
                  </p>
               </div>

               <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800">
                  <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-2">Best Practices</h3>
                  <ul className="text-xs text-amber-800 dark:text-amber-300 space-y-2 list-disc pl-4">
                     <li>Avoid sending more than 2 broadcasts per week.</li>
                     <li>Personalize subjects for higher open rates.</li>
                     <li>Always test your promotional layout first.</li>
                  </ul>
               </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
             <div className="flex flex-col gap-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Broadcast History</h2>
                <p className="text-sm text-muted-foreground">
                  View and manage previously sent notifications.
                </p>
             </div>
             <NotificationHistory />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
