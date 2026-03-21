"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  CircleCheckIcon, 
  LoaderIcon, 
  EllipsisVerticalIcon, 
  Trash2Icon, 
  Edit2Icon 
} from "lucide-react"

export const studentSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  course: z.string(),
  progress: z.number(),
  status: z.string(),
  lastActive: z.string(),
})

export type Student = z.infer<typeof studentSchema>

// Re-implement the DragHandle logic if needed, or just let the table handle it
// For now, I'll provide the columns without the drag handle to simplify, 
// but I'll add it back if the generic table supports external handles.

export const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Student Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-sm text-foreground">{row.original.name}</span>
        <span className="text-[10px] text-muted-foreground">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground border-primary/20 bg-primary/5">
        {row.original.course}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.status === "Completed" ? (
          <CircleCheckIcon className="fill-green-500 dark:fill-green-400 size-3 mr-1" />
        ) : (
          <LoaderIcon className="size-3 mr-1 animate-spin" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 min-w-[100px]">
        <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${row.original.progress}%` }}
          />
        </div>
        <span className="text-[10px] font-bold text-muted-foreground">{row.original.progress}%</span>
      </div>
    ),
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: ({ row }) => <div className="text-right text-muted-foreground text-xs">{row.original.lastActive}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground hover:bg-primary/10 hover:text-primary"
            size="icon"
          >
            <EllipsisVerticalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 rounded-xl">
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <Edit2Icon className="size-4" />
            Edit Student
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
            <Trash2Icon className="size-4" />
            Delete Student
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
