"use client"

import * as React from "react"
import Link from "next/link"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon } from "lucide-react"

import logo from "@/assets/logo-dark.png"

const data = {
  user: {
    name: "Admin",
    email: "admin@hoaservices.co.uk",
    avatar: "/avatars/admin.jpg",
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
