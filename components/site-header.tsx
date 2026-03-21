"use client"

import { useEffect, useState } from "react"
import { NavUser } from "@/components/nav-user"
import { Separator } from "@/components/ui/separator"
import { SidebarMenu, SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const [user, setUser] = useState({
    name: "User",
    email: "",
    avatar: "",
  })

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
    if (storedUser.role) {
      const fallbackName = storedUser.role.charAt(0).toUpperCase() + storedUser.role.slice(1)
      setUser({
        name: storedUser.name || fallbackName,
        email: storedUser.email || `${storedUser.role}@hoaservices.co.uk`,
        avatar: storedUser.avatar || `https://ui-avatars.com/api/?name=${storedUser.name || fallbackName}&background=002147&color=fff`,
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
