import { getUserCountByRole } from "@/actions/users";
import { AppSidebar } from "@/components/app-sidebar";
import AdminDashboardChart from "@/components/charts/AdminDashboardChart";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import DashFormIssues from "@/components/DashFormIssues";
import DashSubmissionsStat from "@/components/DashSubmissionsStat";
import DashUsageStats from "@/components/DashUsageStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/db";
import Link from "next/link";

export default async function AdminDashboard() {
    const forms = await prisma.form.findMany({ include: { submissions: true } });
    const usersCount = await getUserCountByRole("USER");
    const supervisorCount = await getUserCountByRole("SUPERVISOR");

    if (!supervisorCount.success || !usersCount.success) {
        return <p>Error while loading user or supervisor count</p>;
    }

    const chartData = forms.map((form) => {
        return {
            formTitle: form.title,
            requiredSubmissions: form.role === "USER" ? usersCount.data! : supervisorCount.data!,
            actualSubmissions: form.submissions.length,
        };
    });

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
                            <Button>
                                <Link href="/admin/submissions">View Submissions</Link>
                            </Button>
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
                            <Button>
                                <Link href="/admin/forms">View Form</Link>
                            </Button>
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
                            <Button>
                                <Link href="/admin/forms">View Form</Link>
                            </Button>
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
                            <Button>
                                <Link href="/admin/requests">View Requests</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <Card className="bg-accent/30">
                    <CardHeader>
                        <CardTitle>Form Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AdminDashboardChart data={chartData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
