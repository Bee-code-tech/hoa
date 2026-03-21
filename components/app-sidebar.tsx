"use client"

import * as React from "react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, UsersIcon, FileTextIcon, Settings2Icon } from "lucide-react"

import logo from "@/assets/logo-dark.png"

const data = {
  user: {
    name: "Admin",
    email: "admin@hoaservices.co.uk",
    avatar: "https://ui-avatars.com/api/?name=Admin&background=002147&color=fff",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Courses",
      url: "/dashboard/courses",
      icon: <FileTextIcon />,
    },
    {
      title: "Students",
      url: "/dashboard/students",
      icon: <UsersIcon />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings2Icon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="py-6 px-4">
        <Link href="/dashboard" className="transition-opacity hover:opacity-80">
          <img src={logo.src} alt="HOA Logo" className="h-12 w-auto object-contain" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
