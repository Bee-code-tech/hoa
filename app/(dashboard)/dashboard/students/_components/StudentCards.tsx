"use client"

import { IconTrendingUp, IconUsers, IconActivity, IconSchool } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface StudentCardsProps {
  data: any[]
}

export function StudentCards({ data }: StudentCardsProps) {
  const total = data.length
  const active = data.filter(s => s.status === "Active").length
  const completed = data.filter(s => s.status === "Completed").length
  const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card mt-6">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Students</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +5.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm border-none bg-transparent pt-0">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady growth this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total registered accounts
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Students</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {active}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <IconActivity className="size-3 mr-1" />
              LIVE
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm border-none bg-transparent pt-0">
          <div className="line-clamp-1 flex gap-2 font-medium">
            High engagement today <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Students currently in-platform
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Completion Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {completionRate}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +2.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm border-none bg-transparent pt-0">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Course finishers trending up <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Based on completed modules
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Enrollments</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            12
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +10%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm border-none bg-transparent pt-0">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong weekly performance <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Last 7 days registration
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
