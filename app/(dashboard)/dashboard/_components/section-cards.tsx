"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface SectionCardItem {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: string
    isUp: boolean
  }
  description: string
  footerLabel?: string
}

interface SectionCardsProps {
  items?: SectionCardItem[]
}

const defaultItems: SectionCardItem[] = [
  {
    label: "Total Revenue",
    value: "£1,250.00",
    icon: <IconTrendingUp />,
    trend: { value: "+12.5%", isUp: true },
    description: "Visitors for the last 6 months",
    footerLabel: "Trending up this month"
  },
  {
    label: "New Customers",
    value: "1,234",
    icon: <IconTrendingDown />,
    trend: { value: "-20%", isUp: false },
    description: "Acquisition needs attention",
    footerLabel: "Down 20% this period"
  },
  {
    label: "Active Accounts",
    value: "45,678",
    icon: <IconTrendingUp />,
    trend: { value: "+12.5%", isUp: true },
    description: "Engagement exceed targets",
    footerLabel: "Strong user retention"
  },
  {
    label: "Growth Rate",
    value: "4.5%",
    icon: <IconTrendingUp />,
    trend: { value: "+4.5%", isUp: true },
    description: "Meets growth projections",
    footerLabel: "Steady performance increase"
  }
]

export function SectionCards({ items = defaultItems }: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {items.map((item, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{item.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {item.value}
            </CardTitle>
            {item.trend && (
              <CardAction>
                <Badge variant="outline">
                  {item.trend.isUp ? <IconTrendingUp /> : <IconTrendingDown />}
                  {item.trend.value}
                </Badge>
              </CardAction>
            )}
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm border-none bg-transparent pt-0">
            {item.footerLabel && (
              <div className="line-clamp-1 flex gap-2 font-medium">
                {item.footerLabel} {item.trend?.isUp ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
              </div>
            )}
            <div className="text-muted-foreground">
              {item.description}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
