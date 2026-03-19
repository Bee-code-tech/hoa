"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "A simple area chart"

const dataByYear: Record<string, { month: string; desktop: number }[]> = {
  "2026": [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
    { month: "July", desktop: 250 },
    { month: "August", desktop: 280 },
    { month: "September", desktop: 260 },
    { month: "October", desktop: 310 },
    { month: "November", desktop: 340 },
    { month: "December", desktop: 380 },
  ],
  "2027": [
    { month: "January", desktop: 214 },
    { month: "February", desktop: 209 },
    { month: "March", desktop: 73 },
    { month: "April", desktop: 237 },
    { month: "May", desktop: 305 },
    { month: "June", desktop: 186 },
    { month: "July", desktop: 220 },
    { month: "August", desktop: 260 },
    { month: "September", desktop: 290 },
    { month: "October", desktop: 350 },
    { month: "November", desktop: 400 },
    { month: "December", desktop: 450 },
  ],
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartAreaDefault() {
  const [year, setYear] = React.useState("2026")
  const chartData = dataByYear[year]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>
              Showing total visitors for {year}
            </CardDescription>
          </div>
          <CardAction>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[120px]" size="sm">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-none bg-transparent pt-0">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this year <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - December {year}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
