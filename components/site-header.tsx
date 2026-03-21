"use client"

import { useEffect, useState } from "react"
import { NavUser } from "@/components/nav-user"
import { Separator } from "@/components/ui/separator"
import { SidebarMenu, SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const [user, setUser] = useState({
    name: "Admin",
    email: "admin@hoaservices.co.uk",
    avatar: "https://ui-avatars.com/api/?name=Admin&background=002147&color=fff",
  })

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
    if (storedUser.name) {
      setUser({
        name: storedUser.name,
        email: storedUser.email || (storedUser.role === "student" ? "student@hoaservices.co.uk" : "admin@hoaservices.co.uk"),
        avatar: storedUser.avatar || `https://ui-avatars.com/api/?name=${storedUser.name}&background=002147&color=fff`,
      })
    }
  }, [])

  return (
    <header className="flex h-fit shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10 py-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-fit">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-3 data-[orientation=vertical]:h-6"
        />
        <h1 className="text-xl font-bold tracking-tight text-primary">Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          <Separator
            orientation="vertical"
            className="hidden h-6 mx-2 lg:block"
          />
          <div className="w-fit">
            <SidebarMenu>
              <NavUser user={user} />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
