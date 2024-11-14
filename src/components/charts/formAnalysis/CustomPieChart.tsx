"use client";
import React from "react";
import { Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CustomPieChart = ({ question, data }: any) => {
    const totalResponses = data.reduce((p: number, c: any) => p + c.count, 0);

    const config: any = {};
    data.forEach((obj: any, idx: number) => {
        config[obj.answer] = { label: obj.answer, color: `hsl(var(--chart-${idx + 1}))` };
    });

    data = data.map((ob: any, id: number) => {
        return { ...ob, fill: `var(--color-${ob.answer})` };
    });

    if (totalResponses === 0) {
        return <></>;
    }

    return (
        <Card className="flex-1 min-w-60 max-w-xl">
            <CardHeader className="items-center pb-0">
                <CardTitle>{question}</CardTitle>
            </CardHeader>

            <CardContent>
                <ChartContainer config={config} className="mx-auto aspect-square max-h-[250px]">
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
