"use client"

import { BookOpen, Trophy, Clock, Star } from "lucide-react"
import { SectionCards, SectionCardItem } from "./section-cards"
import { DataTable } from "./data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const studentStats: SectionCardItem[] = [
  {
    label: "Courses Enrolled",
    value: "4",
    icon: <BookOpen />,
    description: "Active learning paths",
    footerLabel: "Keep it up!",
    trend: { value: "NEW", isUp: true }
  },
  {
    label: "Completed Modules",
    value: "12/24",
    icon: <Trophy />,
    description: "Your curriculum progress",
    footerLabel: "50% Overall",
    trend: { value: "+2", isUp: true }
  },
  {
    label: "Learning Hours",
    value: "18.5h",
    icon: <Clock />,
    description: "Total time spent learning",
    footerLabel: "Consistent pace",
    trend: { value: "+2.4h", isUp: true }
  },
  {
    label: "Achievement Points",
    value: "850",
    icon: <Star />,
    description: "XP earned from quizzes",
    footerLabel: "Top 10% student",
    trend: { value: "+150", isUp: true }
  }
]

interface EnrolledCourse {
  id: string
  title: string
  progress: number
  lastAccessed: string
  status: string
}

const enrolledCourses: EnrolledCourse[] = [
  { id: "1", title: "SIA Door Supervision", progress: 75, lastAccessed: "2 hours ago", status: "In Progress" },
  { id: "2", title: "CCTV Operations", progress: 30, lastAccessed: "Yesterday", status: "In Progress" },
  { id: "3", title: "First Aid at Work", progress: 100, lastAccessed: "3 days ago", status: "Completed" },
]

const courseColumns: ColumnDef<EnrolledCourse>[] = [
  {
    accessorKey: "title",
    header: "Course Name",
    cell: ({ row }) => <span className="font-bold text-sm">{row.original.title}</span>,
  },
  {
    accessorKey: "progress",
    header: "Your Progress",
    cell: ({ row }) => (
      <div className="flex items-center gap-3 min-w-[150px]">
        <Progress value={row.original.progress} className="h-1.5 flex-1" />
        <span className="text-xs font-bold text-muted-foreground">{row.original.progress}%</span>
      </div>
    ),
  },
  {
    accessorKey: "lastAccessed",
    header: "Last Accessed",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.lastAccessed}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge 
        variant={row.original.status === "Completed" ? "default" : "secondary"}
        className="text-[10px] uppercase font-bold"
      >
        {row.original.status}
      </Badge>
    ),
  },
]

export default function StudentOverview() {
  return (
    <div className="flex flex-col gap-8">
      <SectionCards items={studentStats} />
      
      <div className="flex flex-col gap-2 px-4 lg:px-6">
        <h2 className="text-2xl font-bold tracking-tight">Continue Learning</h2>
        <p className="text-sm text-muted-foreground">
          Jump back into your active courses and pick up where you left off.
        </p>
      </div>

      <div className="px-4 lg:px-6 pb-20">
        <DataTable 
          columns={courseColumns} 
          data={enrolledCourses} 
          searchPlaceholder="Search your courses..."
        />
      </div>
    </div>
  )
}
