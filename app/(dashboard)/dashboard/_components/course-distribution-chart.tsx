"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { category: "security", students: 450, fill: "var(--color-security)" },
  { category: "healthSafety", students: 300, fill: "var(--color-healthSafety)" },
  { category: "management", students: 250, fill: "var(--color-management)" },
  { category: "firstAid", students: 200, fill: "var(--color-firstAid)" },
  { category: "others", students: 134, fill: "var(--color-others)" },
]

const chartConfig = {
  students: {
    label: "Students",
  },
  security: {
    label: "Security",
    color: "var(--primary)",
  },
  healthSafety: {
    label: "Health & Safety",
    color: "var(--accent)",
  },
  management: {
    label: "Management",
    color: "var(--chart-3)",
  },
  firstAid: {
    label: "First Aid",
    color: "var(--chart-4)",
  },
  others: {
    label: "Others",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function CourseDistributionChart() {
  const totalStudents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.students, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Course Distribution</CardTitle>
        <CardDescription>Enrollments by Category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="students"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStudents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Students
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
