"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  EllipsisVerticalIcon, 
  Trash2Icon, 
  SendIcon, 
  EyeIcon, 
  RefreshCcwIcon 
} from "lucide-react"

export interface NotificationLog {
  id: number
  date: string
  segment: string
  type: string
  subject: string
  status: string
}

export const notificationColumns: ColumnDef<NotificationLog>[] = [
  {
    accessorKey: "date",
    header: "Sent On",
    cell: ({ row }) => <span className="text-xs font-medium">{row.original.date}</span>,
  },
  {
    accessorKey: "segment",
    header: "Segment",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-[10px] uppercase font-bold border-primary/20 bg-primary/5 text-primary">
        {row.original.segment}
      </Badge>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge 
        variant="secondary"
        className="text-[10px] uppercase font-bold border-none"
      >
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => <div className="text-sm font-medium max-w-[200px] truncate">{row.original.subject}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-green-500" />
        <span className="text-xs font-medium">{row.original.status}</span>
      </div>
    ),
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
            <EyeIcon className="size-4" /> View Content
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <RefreshCcwIcon className="size-4" /> Resend
          </DropdownMenuItem>
          <DropdownMenuTrigger />
          <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
            <Trash2Icon className="size-4" /> Delete Log
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
