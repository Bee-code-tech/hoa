"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, ExternalLink, MoreVertical } from "lucide-react"
import { useRouter } from "next/navigation"

export interface CourseData {
  id: string
  title: string
  slug: string
  category: string
  price: string
  modules: any[]
}

export const adminCourseColumns: ColumnDef<CourseData>[] = [
  {
    accessorKey: "title",
    header: "Course Title",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-primary">{row.original.title}</span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{row.original.slug}</span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-[10px] border-primary/20 bg-primary/5 text-primary">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span className="font-bold text-gold">{row.original.price}</span>,
  },
  {
    accessorKey: "modules",
    header: "Complexity",
    cell: ({ row }) => (
      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
        {row.original.modules?.length || 0} MODULES
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter()
      
      return (
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push(`/dashboard/courses/${row.original.slug}`)}
            className="size-8 text-muted-foreground hover:text-primary rounded-lg"
          >
            <ExternalLink className="size-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push(`/dashboard/courses/${row.original.slug}/edit`)}
            className="size-8 text-muted-foreground hover:text-primary rounded-lg"
          >
            <Edit2 className="size-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="size-8 text-muted-foreground hover:text-destructive rounded-lg"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      )
    },
  },
]
