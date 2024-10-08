
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import ChartDataFetcher from "./ChartData"
import { set } from "date-fns"
import { useState } from "react"
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
interface chartDataType {
  month: string
  rSubmissions: number
  aSubmissions: number
}
export function DashChart() {
  const [chartData, setChartData] = useState<chartDataType[]>([])
  const handleDataFetch = (data: chartDataType[]) => {
      setChartData(data)
  }
  return (
    <div>
      <ChartDataFetcher onDataFetch={handleDataFetch} />
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
    </div>
    
  )
}
