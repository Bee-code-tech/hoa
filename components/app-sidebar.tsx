"use client"

import * as React from "react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboardIcon, 
  UsersIcon, 
  FileTextIcon, 
  Settings2Icon, 
  BellIcon,
  BookOpenIcon,
  CreditCardIcon
} from "lucide-react"

import logo from "@/assets/logo-dark.png"

const data = {
  user: {
    name: "Admin",
    email: "admin@hoaservices.co.uk",
    avatar: "https://ui-avatars.com/api/?name=Admin&background=002147&color=fff",
    role: "admin" as "admin" | "student",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "My Courses",
      url: "/dashboard/my-courses",
      icon: <BookOpenIcon />,
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
      title: "Notifications",
      url: "/dashboard/notifications",
      icon: <BellIcon />,
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: <CreditCardIcon />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings2Icon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userRole, setUserRole] = React.useState<string | null>(null)

  React.useEffect(() => {
    // In a real app this would be in an auth context
    const user = JSON.parse(localStorage.getItem("user") || '{"role": "admin"}')
    setUserRole(user.role)
  }, [])

  const navItems = data.navMain.filter(item => {
    if (userRole === "student") {
      // Student only sees personal learning and settings
      return ["My Courses", "Courses", "Settings"].includes(item.title)
    }
    // Admin sees everything EXCEPT student personal view
    return item.title !== "My Courses"
  })

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="py-6 px-4">
        <Link href="/dashboard" className="transition-opacity hover:opacity-80">
          <img src={logo.src} alt="HOA Logo" className="h-12 w-auto object-contain" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
    </Sidebar>
  )
}
