"use client";
import React from "react";
import { Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

[
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const CustomPieChart = ({ question, data }: any) => {
    const totalResponses = data.reduce((p: number, c: any) => p + c.count, 0);

    const chartConfig = {
        yes: {
            label: "Yes",
            color: "hsl(var(--chart-1))",
        },
        no: {
            label: "No",
            color: "hsl(var(--chart-2))",
        },
        na: {
            label: "NA",
            color: "hsl(var(--chart-3))",
        },
    } satisfies ChartConfig;

    const config: any = {};
    data.forEach((obj: any, idx: number) => {
        config[obj.answer] = { label: obj.answer, color: `hsl(var(--chart-${idx + 1}))` };
    });

    data = data.map((ob: any, id: number) => {
        return { ...ob, fill: `var(--color-${ob.answer})` };
    });
    console.log(data);
    console.log(config);
    return (
        <Card className="w-fit">
            <CardHeader className="items-center pb-0">
                <CardTitle>{question}</CardTitle>
            </CardHeader>

            <CardContent>
                <ChartContainer config={config} className="mx-auto aspect-square max-h-[250px] min-w-96">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={data} dataKey="count" nameKey="answer" innerRadius={60} strokeWidth={5}>
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
                                                    {totalResponses}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Responses
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default CustomPieChart;
