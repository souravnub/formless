import { getForm } from "@/actions/forms";
import { getSubmissions } from "@/actions/submissions";
import CustomPieChart from "@/components/charts/formAnalysis/CustomPieChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/db";
import { ArrowUpRight } from "lucide-react";
import React from "react";

const FormAnalyticsPage = async ({ params }: { params: { id: string } }) => {
    const form = await getForm(params.id);
    const formSubmissions = await prisma.formSubmission.findMany({ where: { formId: params.id } });

    const radioButtonFields: any = [];

    Object.keys((form?.schema as any).properties).forEach((key) => {
        const keyValue = (form?.schema as any).properties[key];
        if (keyValue.enum !== undefined) {
            radioButtonFields.push({ key, enum: keyValue.enum });
        }
    });
    const radioButtonFieldChartData: any = {};

    radioButtonFields.forEach((radioGroup: any) => {
        const enumObj: any = {};

        radioGroup.enum.map((e: any) => (enumObj[e] = { count: 0 }));

        formSubmissions.forEach((submission) => {
            const res = submission.submissions as any;
            enumObj[res[radioGroup.key]].count++;
        });

        radioButtonFieldChartData[radioGroup.key] = Object.keys(enumObj).map((key) => {
            return { answer: key, count: enumObj[key].count };
        });
    });

    return (
        <div className="container py-5">
            <h1 className="font-semibold text-3xl">Form Analytics</h1>
            <p className="font-medium text-muted-foreground">Fire extinguisher form</p>

            <div className="mt-8 flex gap-4">
                <Card className=" rounded-md ">
                    <CardHeader className="pb-8">
                        <CardDescription className="text-lg font-medium">Total Responses</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-10  items-center justify-between">
                        <CardTitle className="text-2xl font-medium">10</CardTitle>
                        <span className="rounded-md p-1 border px-4">50% users responded</span>
                    </CardContent>
                </Card>

                <Card className=" rounded-md">
                    <CardHeader className="pb-8">
                        <CardDescription className="text-lg font-medium">Average Response Time</CardDescription>
                    </CardHeader>
                    <CardContent className="flex  gap-10 items-center justify-between">
                        <CardTitle className="text-2xl font-medium">16sec</CardTitle>
                        <span className="rounded-md border p-1 flex gap-1 items-center">
                            <ArrowUpRight className="size-4 text-green-600 stroke-[3] " />
                            10%
                        </span>
                    </CardContent>
                </Card>

                <Card className=" rounded-md">
                    <CardHeader className="pb-8">
                        <CardDescription className="text-lg font-medium">Responses made Today</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl font-medium">5</CardTitle>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-5 flex gap-2">
                {Object.keys(radioButtonFieldChartData).map((key: any) => {
                    return <CustomPieChart key={key} question={key} data={radioButtonFieldChartData[key]} />;
                })}
            </div>
        </div>
    );
};

export default FormAnalyticsPage;
