"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const description = "A multiple bar chart";

type ChartData = {
    formTitle: string;
    requiredSubmissions: number;
    actualSubmissions: number;
};

const chartConfig = {
    requiredSubmissions: {
        label: "Required Submissions",
        color: "#000000",
    },
    actualSubmissions: {
        label: "Actual Submissions",
        color: "#D15617",
    },
} satisfies ChartConfig;

export default function AdminDashboardChart({ data }: { data: ChartData[] }) {
    return (
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="formTitle" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="requiredSubmissions" fill="var(--color-requiredSubmissions)" radius={2} />
                <Bar dataKey="actualSubmissions" fill="var(--color-actualSubmissions)" radius={2} />
            </BarChart>
        </ChartContainer>
    );
}
