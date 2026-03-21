"use client"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, RefreshCcw, Trash2, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: 1,
    date: "2024-03-21 14:30",
    segment: "All Students",
    type: "Announcement",
    subject: "Platform Maintenance Schedule",
    status: "Sent",
  },
  {
    id: 2,
    date: "2024-03-20 09:15",
    segment: "Paid Students",
    type: "Promotion",
    subject: "Exclusive 20% discount on Advanced SIA",
    status: "Sent",
  },
  {
    id: 3,
    date: "2024-03-19 11:00",
    segment: "Free Students",
    type: "Update",
    subject: "New free modules added to your account",
    status: "Sent",
  },
]

export default function NotificationHistory() {
  return (
    <div className="bg-white dark:bg-slate-950 rounded-2xl border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
          <TableRow>
            <TableHead>Sent On</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((n) => (
            <TableRow key={n.id} className="hover:bg-primary/5 transition-colors group">
              <TableCell className="text-sm font-medium">
                {n.date}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[10px] uppercase font-bold border-primary/20 bg-primary/5 text-primary">
                  {n.segment}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="secondary"
                  className={cn(
                    "text-[10px] uppercase font-bold border-none",
                    n.type === "Announcement" && "bg-blue-100 text-blue-700",
                    n.type === "Promotion" && "bg-purple-100 text-purple-700",
                    n.type === "Update" && "bg-green-100 text-green-700",
                  )}
                >
                  {n.type}
                </Badge>
              </TableCell>
              <TableCell className="text-sm font-medium max-w-[200px] truncate">
                {n.subject}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium">{n.status}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-200 shadow-xl">
                    <DropdownMenuItem className="gap-2 cursor-pointer py-2.5">
                      <Eye className="size-4" /> View Content
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer py-2.5">
                      <RefreshCcw className="size-4" /> Resend
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer py-2.5">
                      <Mail className="size-4" /> Send Test
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 py-2.5 focus:text-red-600 focus:bg-red-50">
                      <Trash2 className="size-4" /> Delete Log
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
