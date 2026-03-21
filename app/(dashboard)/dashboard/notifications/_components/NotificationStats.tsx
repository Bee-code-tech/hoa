"use client"

import { Send, Users, CheckCircle, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function NotificationStats() {
  const stats = [
    {
      label: "Total Broadcasts",
      value: "24",
      icon: Send,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Recipients",
      value: "1,284",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Delivery Rate",
      value: "99.8%",
      icon: CheckCircle,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "Templates",
      value: "5",
      icon: MessageSquare,
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-none shadow-sm bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-x-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`size-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
