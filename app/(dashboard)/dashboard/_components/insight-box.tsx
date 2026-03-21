"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { course: "Security L1", completions: 45, enrolled: 120 },
  { course: "First Aid", completions: 82, enrolled: 150 },
  { course: "Surveillance", completions: 28, enrolled: 60 },
  { course: "Management", completions: 54, enrolled: 100 },
  { course: "Cyber Sec", completions: 31, enrolled: 80 },
]

const chartConfig = {
  completions: {
    label: "Completions",
    color: "var(--primary)",
  },
  enrolled: {
    label: "Enrolled",
    color: "var(--gold)",
  },
}

export function InsightBox() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="py-3">
        <CardTitle className="text-lg">Course Completion Insights</CardTitle>
        <CardDescription className="text-xs">Completion vs Enrollment Rates</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="min-h-[160px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="course"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="completions" fill="var(--primary)" radius={4} />
            <Bar dataKey="enrolled" fill="var(--gold)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
