import { getForm } from "@/actions/forms";
import { CustomBarChart } from "@/components/charts/formAnalysis/CustomBarChart";
import CustomPieChart from "@/components/charts/formAnalysis/CustomPieChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/db";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getCheckboxChartData, getRadioButtonChartData } from "./utils";

const FormAnalyticsPage = async ({ params }: { params: { id: string } }) => {
    const form = await getForm(params.id);
    const formSubmissions = await prisma.formSubmission.findMany({
        where: { formId: params.id },
        include: { user: true },
    });

    if (!form) return <h1>No Form found</h1>;

    const totalResponders = await prisma.user.count({ where: { role: form.role } });
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    const responsesMadeToday = await prisma.formSubmission.count({
        where: { createdAt: { gte: startOfDay, lte: endOfDay }, formId: params.id },
    });

    const radioButtonFieldChartData = getRadioButtonChartData(form.schema, formSubmissions);
    const checkboxChartData = getCheckboxChartData(form.schema, formSubmissions);

    return (
        <div className="container py-5">
            <h1 className="font-semibold text-3xl">Form Analytics</h1>
            <p className="font-medium text-muted-foreground">{form?.title}</p>

            <div className="mt-8 flex flex-wrap gap-4 ">
                <Card className="rounded-md flex flex-1 flex-col justify-between">
                    <CardHeader className="pb-8">
                        <CardDescription className="text-lg font-medium">Total Responses</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-10   items-center justify-between">
                        <CardTitle className="text-2xl font-medium">{formSubmissions.length}</CardTitle>
                        <span className="rounded-md p-1 border px-4">
                            {(formSubmissions.length / totalResponders) * 100}% users responded
                        </span>
                    </CardContent>
                </Card>

                <Card className=" rounded-md flex flex-1 flex-col justify-between">
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

                <Card className=" rounded-md flex flex-1 flex-col justify-between">
                    <CardHeader className="pb-8">
                        <CardDescription className="text-lg font-medium">Responses made Today</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl font-medium">{responsesMadeToday}</CardTitle>
                    </CardContent>
                </Card>

                <Card className=" rounded-md flex-1 p-2 w-44 flex flex-col justify-between min-w-36">
                    <CardHeader className="p-0 mb-2">
                        <CardDescription className="text-primary font-medium">Responses</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-1">
                        {[...formSubmissions].splice(0, 4).map((submission) => {
                            return (
                                <Link
                                    href={`/admin/submissions/${submission.id}`}
                                    key={submission.id}
                                    className="bg-muted p-1 px-3 rounded-sm flex justify-between items-center group"
                                >
                                    <span className="font-medium text-sm">{submission.user.name}</span>

                                    <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Link>
                            );
                        })}
                        {formSubmissions.length > 4 && (
                            <Button variant={"link"} className="underline w-fit px-0">
                                <Link href={`/admin/submissions?formId=${params.id}`}>View all submissions</Link>
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                {Object.keys(radioButtonFieldChartData).map((key: any) => {
                    return <CustomPieChart key={key} question={key} data={radioButtonFieldChartData[key]} />;
                })}
            </div>

            <div className="mt-5 flex gap-3 flex-wrap">
                {Object.keys(checkboxChartData).map((key: any) => {
                    return <CustomBarChart key={key} title={key} data={checkboxChartData[key]} />;
                })}
            </div>
        </div>
    );
};

export default FormAnalyticsPage;
