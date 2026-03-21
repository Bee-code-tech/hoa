"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "../../_components/data-table"
import { adminCourseColumns } from "./columns"
import coursesData from "../courses.json"

export function AdminCoursesTable() {
  const router = useRouter()
  const data = (coursesData as any).default || coursesData

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Course Management</h2>
          <p className="text-sm text-muted-foreground">Orchestrate your curriculum and track student enrollment metrics.</p>
        </div>
        <Button 
          className="rounded-xl px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2" 
          onClick={() => router.push("/dashboard/courses/new")}
        >
          <Plus className="size-4" /> Add Course
        </Button>
      </div>

      <div className="px-4 lg:px-6 pb-20">
        <DataTable 
          columns={adminCourseColumns} 
          data={Array.isArray(data) ? data : []} 
          searchPlaceholder="Search courses..."
        />
      </div>
    </div>
  )
}
