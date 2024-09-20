import React from "react";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { Button } from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Checkbox} from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const reportTitles = Array.from({ length: 10 }, (_, i) => `Report ${i + 1}`);
const ReportsPage = () => {
    return (
        <div className="container">
            <CustomBreadcrumb
                className="my-3"
                list={[
                    { name: "Dashboard", href: "/admin" },
                    { name: "Reports", href: "/admin/forms" },
                ]}
            />
            <div className="flex justify-between my-5">
                <h1 className="text-xl font-medium items-center">
                    Generate Reports
                </h1>

                <Button asChild className="flex gap-2">
                    <Link href={"/admin/reports/add"}>Add Report</Link>
                </Button>
            </div>
            <div className="flex gap-2 flex-row flex-wrap">
            <Card className="mb-2 ">
                <CardHeader>Report Titles</CardHeader>
                <CardContent>
                    <ScrollArea className="h-80">
                        <div className="flex flex-col gap-2">
                            {reportTitles.map((title) => (
                                <div key={title} className="flex items-center gap-2">
                                    <Checkbox />
                                    <Label>{title}</Label>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
            <Card className="mb-2 ">
                <CardHeader>Report Settings</CardHeader>
                <CardContent>
                    <div>
                        <Label>Report Name</Label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        <Label>Report Type</Label>
                        <select
                            className="w-full border border-gray-300 rounded-md p-2"/>
                            <Label>Report Format</Label>
                        <select
                            className="w-full border border-gray-300 rounded-md p-2"/>
                    </div>
                    
                </CardContent>
            </Card>

            </div>
            
        </div>
    )
};

export default ReportsPage;
