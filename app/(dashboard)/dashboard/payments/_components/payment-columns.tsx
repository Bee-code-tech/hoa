"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2Icon, 
  ClockIcon, 
  MoreHorizontalIcon,
  EyeIcon
} from "lucide-react"
import { Payment } from "@/lib/payment-service"
import { PaymentDetailModal } from "./payment-detail-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ActionCell = ({ payment, onUpdate }: { payment: Payment; onUpdate?: () => void }) => {
  const [showDetailModal, setShowDetailModal] = React.useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 rounded-xl hover:bg-primary/10 hover:text-primary">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-xl w-48 shadow-xl border-none p-1.5 translate-y-1">
          <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground pb-1">Management</DropdownMenuLabel>
          <DropdownMenuItem 
            className="gap-2 cursor-pointer rounded-lg font-medium py-2.5"
            onClick={() => setShowDetailModal(true)}
          >
            <EyeIcon className="size-4 text-primary" />
            Review Payment
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1.5 opacity-50" />
          <DropdownMenuItem 
            className="gap-2 cursor-pointer rounded-lg font-medium py-2.5"
            onClick={() => window.open(payment.receiptUrl, '_blank')}
          >
             <EyeIcon className="size-4" />
             View Receipt Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PaymentDetailModal 
        payment={payment} 
        isOpen={showDetailModal} 
        onClose={() => setShowDetailModal(false)}
        onUpdate={onUpdate}
      />
    </>
  )
}

export const getPaymentColumns = (onUpdate?: () => void): ColumnDef<Payment>[] => [
  {
    accessorKey: "student",
    header: "Student",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-sm text-foreground">{row.original.student?.name || "Unknown"}</span>
        <span className="text-[10px] text-muted-foreground">{row.original.student?.email || "No email"}</span>
      </div>
    ),
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => (
       <div className="max-w-[200px] truncate font-medium text-sm">
        {row.original.course?.title || "Deleted Course"}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(amount)
 
      return <div className="font-bold text-primary">{formatted}</div>
    },
  },
  {
    accessorKey: "transactionDate",
    header: "Date",
    cell: ({ row }) => {
      const dateString = row.original.transactionDate;
      const formattedDate = dateString ? new Date(dateString).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }) : "N/A";
      return <div className="text-muted-foreground text-xs">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge 
          variant="outline" 
          className={`px-2 py-0.5 text-[10px] font-bold border-none ${
            status === "confirmed" 
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
              : status === "pending"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {status === "confirmed" ? (
            <CheckCircle2Icon className="size-3 mr-1" />
          ) : (
            <ClockIcon className="size-3 mr-1" />
          )}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell payment={row.original} onUpdate={onUpdate} />,
  },
]
