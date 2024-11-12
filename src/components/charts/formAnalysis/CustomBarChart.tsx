"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
const chartData = [
    { label: "SAIT", count: 200 },
    { label: "Bow Valley", count: 300 },
    { label: "NAIT", count: 102 },
];

export function CustomBarChart(props: any) {
    return (
        <Card className="flex-1 min-w-80 max-w-xl">
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="">
                    <BarChart accessibilityLayer data={props.data} layout="vertical" margin={{ left: 15 }}>
                        <YAxis dataKey="label" type="category" tickLine={false} axisLine={false} />
                        <XAxis dataKey="count" type="number" hide />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                        <Bar dataKey="count" layout="vertical" fill="var(--color-count)" radius={4}></Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
