"use client"

import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { 
  User, 
  Shield, 
  Bell, 
  Users, 
  Settings as SettingsIcon,
  LayoutDashboard
} from "lucide-react"

import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import ProfileForm from "./_components/ProfileForm"
import SecurityForm from "./_components/SecurityForm"
import AdminSettings from "./_components/AdminSettings"

export default function SettingsPage() {
  const [userRole, setUserRole] = React.useState<string | null>(null)

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || '{"role": "admin"}')
    setUserRole(user.role)
  }, [])

  if (!userRole) return null

  const isAdmin = userRole === "admin"

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
            <div className="flex flex-col gap-8 py-8 px-4 lg:px-8 max-w-6xl">
              
              <div className="flex flex-col gap-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your personal details, security, and administrative preferences.
                </p>
              </div>

              <Tabs defaultValue="profile" orientation="vertical" className="flex flex-col md:flex-row gap-8 bg-transparent">
                <TabsList className="flex flex-col h-auto bg-transparent border-0 p-0 items-start justify-start gap-1 min-w-[200px] group-data-vertical/tabs:w-auto">
                  <TabsTrigger 
                    value="profile" 
                    className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-active:bg-primary/5 data-active:text-primary hover:bg-primary/5 transition-all text-sm font-medium border-0"
                  >
                    <User className="size-4" /> Personal Info
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security"
                    className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-active:bg-primary/5 data-active:text-primary hover:bg-primary/5 transition-all text-sm font-medium border-0"
                  >
                    <Shield className="size-4" /> Security
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications"
                    className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-active:bg-primary/5 data-active:text-primary hover:bg-primary/5 transition-all text-sm font-medium border-0"
                  >
                    <Bell className="size-4" /> Notifications
                  </TabsTrigger>
                  
                  {isAdmin && (
                    <>
                      <div className="mt-4 mb-2 px-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">
                        Administration
                      </div>
                      <TabsTrigger 
                        value="admin"
                        className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-active:bg-primary/5 data-active:text-primary hover:bg-primary/5 transition-all text-sm font-medium border-0"
                      >
                        <SettingsIcon className="size-4" /> System Core
                      </TabsTrigger>
                    </>
                  )}
                </TabsList>

                <div className="flex-1 bg-white dark:bg-slate-950 p-8 rounded-3xl border shadow-sm border-slate-200 dark:border-slate-800">
                  <TabsContent value="profile" className="m-0 mt-0">
                    <ProfileForm />
                  </TabsContent>
                  <TabsContent value="security" className="m-0 mt-0">
                    <SecurityForm />
                  </TabsContent>
                  <TabsContent value="notifications" className="m-0 mt-0">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Manage how and where you receive platform alerts.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-12 rounded-2xl flex flex-col items-center justify-center text-center gap-4">
                         <div className="p-4 bg-primary/10 rounded-full">
                           <Bell className="size-10 text-primary" />
                         </div>
                         <div className="space-y-1">
                           <h4 className="font-bold">Advanced Preferences coming soon</h4>
                           <p className="text-xs text-muted-foreground">You will soon be able to toggle granular email and browser alerts.</p>
                         </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="admin" className="m-0 mt-0">
                    <AdminSettings />
                  </TabsContent>
                </div>
              </Tabs>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
