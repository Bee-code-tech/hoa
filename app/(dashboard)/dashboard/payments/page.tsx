"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SectionCards, SectionCardItem } from "../_components/section-cards"
import { DataTable } from "../_components/data-table"
import { paymentColumns } from "./_components/payment-columns"
import { getPayments, getPaymentStats } from "@/lib/payment-service"
import { 
  IconCreditCard, 
  IconTrendingUp, 
  IconClock, 
  IconCheck 
} from "@tabler/icons-react"

export default function PaymentsPage() {
  const [payments, setPayments] = React.useState(getPayments())
  const [stats, setStats] = React.useState(getPaymentStats())

  React.useEffect(() => {
    // Refresh data from localStorage on mount
    setPayments(getPayments())
    setStats(getPaymentStats())
  }, [])

  const statItems: SectionCardItem[] = [
    {
      label: "Total Revenue",
      value: `£${stats.totalRevenue.toLocaleString()}`,
      icon: <IconTrendingUp />,
      description: "Total confirmed payment revenue",
      footerLabel: "Updated just now",
      trend: { value: "+15.2%", isUp: true }
    },
    {
      label: "Pending Payments",
      value: stats.pendingCount.toString(),
      icon: <IconClock className="text-yellow-500" />,
      description: "Awaiting manual verification",
      footerLabel: "Needs attention"
    },
    {
      label: "Completed",
      value: stats.completedCount.toString(),
      icon: <IconCheck className="text-green-500" />,
      description: "Successfully processed",
      footerLabel: "No issues reported"
    },
    {
      label: "Payment Volume",
      value: `£${stats.totalAmount.toLocaleString()}`,
      icon: <IconCreditCard />,
      description: "Total of all payment attempts",
      footerLabel: "Includes pending and failed"
    }
  ]

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              <div className="flex flex-col gap-2 px-4 lg:px-6">
                <h1 className="text-3xl font-bold tracking-tight">Payments Management</h1>
                <p className="text-muted-foreground">
                  View and verify student payments, manage course access, and track revenue performance.
                </p>
              </div>

              <SectionCards items={statItems} />

              <div className="flex flex-col gap-2 px-4 lg:px-6 mt-4">
                <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
                <p className="text-muted-foreground text-sm">
                  A history of all payment attempts and their current verification status.
                </p>
              </div>

              <div className="px-4 lg:px-6 pb-20 overflow-hidden min-h-[600px]">
                <DataTable 
                  columns={paymentColumns} 
                  data={payments} 
                  searchPlaceholder="Search by student or course..." 
                />
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
