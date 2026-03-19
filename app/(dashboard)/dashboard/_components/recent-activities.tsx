"use client"

import { IconCircleCheck, IconCreditCard, IconPlus, IconUserPlus } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const activities = [
  {
    id: 1,
    type: "enrollment",
    user: "John Doe",
    action: "enrolled in",
    target: "Security Level 1",
    time: "2 mins ago",
    icon: IconUserPlus,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    id: 2,
    type: "completion",
    user: "Jane Smith",
    action: "completed",
    target: "Health & Safety",
    time: "1 hour ago",
    icon: IconCircleCheck,
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
  },
  {
    id: 3,
    type: "payment",
    user: "Alex Johnson",
    action: "paid for",
    target: "Management Essentials",
    time: "3 hours ago",
    icon: IconCreditCard,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
  },
  {
    id: 4,
    type: "new_course",
    user: "Admin",
    action: "published",
    target: "Cyber Security Fundamentals",
    time: "5 hours ago",
    icon: IconPlus,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
  },
  {
    id: 5,
    type: "enrollment",
    user: "Sarah Williams",
    action: "enrolled in",
    target: "First Aid Level 2",
    time: "1 day ago",
    icon: IconUserPlus,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
]

export function RecentActivities() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest updates from your platform</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${activity.iconBg}`}>
                <activity.icon className={`size-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                  <span className="text-primary">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
