"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", rSubmissions: 186, aSubmissions: 80 },
  { month: "February", rSubmissions: 305, aSubmissions: 200 },
  { month: "March", rSubmissions: 237, aSubmissions: 120 },
  { month: "April", rSubmissions: 73, aSubmissions: 190 },
  { month: "May", rSubmissions: 209, aSubmissions: 130 },
  { month: "June", rSubmissions: 214, aSubmissions: 140 },
]

const chartConfig = {
  rSubmissions: {
    label: "Required Submissions",
    color: "#000000",
  },
  aSubmissions: {
    label: "Actual Submissions",
    color: "#D15617",
  },
} satisfies ChartConfig

export function DashChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => (value > 1000 ? `${value / 1000}k` : value)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="rSubmissions" fill="var(--color-rSubmissions)" radius={4} />
        <Bar dataKey="aSubmissions" fill="var(--color-aSubmissions)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
