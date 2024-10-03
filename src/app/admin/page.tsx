"use client"
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { DashChart } from "@/components/dashchart";
import DashSubmissionsStat from "@/components/DashSubmissionsStat";
import { Button } from "@/components/ui/button";
import DashUsageStats from "@/components/DashUsageStats";
import DashFormIssues from "@/components/DashFormIssues";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default async function AdminDashboard() {
    return (
        <div className=" p-2">
            <div className="container mx-auto space-y-2">
                <CustomBreadcrumb
                    list={[
                        { name: "dashboard", href: "/admin" },
                        { name: "overview", href: "/admin" },
                    ]}
                />

                <div className="flex gap-2 flex-row flex-wrap">
                    <Card className="flex-1 min-w-64 bg-accent/30">
                        <CardHeader>
                            <CardTitle>Submissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DashSubmissionsStat />
                        </CardContent>
                        <CardFooter>
                            <Button>View Submissions</Button>
                        </CardFooter>
                    </Card>

                    <Card className="flex-1 min-w-64 bg-accent/30">
                        <CardHeader>
                            <CardTitle>Form Usage</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DashUsageStats />
                        </CardContent>
                        <CardFooter>
                            <Button>View Form</Button>
                        </CardFooter>
                    </Card>
                    {/* Form Issues*/}
                    <Card className="flex-1 min-w-64 bg-accent/30">
                        <CardHeader>
                            <CardTitle>Form Issues</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DashFormIssues />
                        </CardContent>
                        <CardFooter>
                            <Button>View Form</Button>
                        </CardFooter>
                    </Card>
                    {/* User Account Requests*/}
                    <Card className="flex-1 min-w-64 bg-accent/30">
                        <CardHeader>
                            <CardTitle>User Request </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>There are X requests to create an account</p>
                        </CardContent>
                        <CardFooter>
                            <Button>View Requests</Button>
                        </CardFooter>
                    </Card>
                </div>
                {/* Form Metrics Chart*/}
                <Card className="bg-accent/30">
                    <CardHeader>
                        <CardTitle>Form Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DashChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
