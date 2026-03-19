"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="gap-2">
          {items.map((item) => {
            const isActive = pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url))
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                  className={`flex items-center gap-3 px-3 py-6 text-base transition-all group-data-[collapsible=icon]:py-2 ${
                    isActive 
                      ? "!bg-primary font-semibold !text-primary-foreground hover:!bg-primary/90" 
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Link href={item.url}>
                    {item.icon && React.isValidElement(item.icon) && React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                      className: `size-6 shrink-0 ${isActive ? "!text-primary-foreground" : "text-sidebar-foreground/70"}`
                    })}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
