"use client";
import { getSubmissions } from "@/actions/submissions";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { DatePickerWithRange } from "@/components/DatePicker";
import { DateFilterSelect } from "@/components/filterSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Submissions = Prisma.FormSubmissionGetPayload<{
    include: { user: true; form: true };
}>;

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState<Submissions[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSubmissions = async () => {
        const submissions = await getSubmissions();
        setSubmissions(submissions);
        setLoading(false);
    };
    useEffect(() => {
        fetchSubmissions();
    }, []);

    return (
        <div className="container">
            <CustomBreadcrumb
                className="my-3"
                list={[
                    { name: "Dashboard", href: "/admin" },
                    { name: "Submissions", href: "/admin/forms" },
                ]}
            />
            <div className="flex justify-between my-5">
                <h1 className="text-xl font-medium items-center">
                    Manage Submissions
                </h1>
                <div className="flex flex-col items-center">
                    <h1 className="mb-4">Filtering</h1>
                    <div className="flex space-x-4">
                        <DateFilterSelect />
                        <DatePickerWithRange />
                    </div>
                </div>
            </div>
            <Card className="mb-2">
                <CardHeader>Submissions</CardHeader>
                <CardContent>
                    <Table className="border">
                        <TableHeader className="bg-accent/70">
                            <TableRow>
                                <TableHead className="pl-5">
                                    User's Name
                                </TableHead>
                                <TableHead>Contact Info</TableHead>
                                <TableHead>Form Name</TableHead>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Last Edited</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.map((submission) => (
                                <TableRow
                                    key={submission.id}
                                    className="hover:bg-none!important">
                                    <TableCell className="font-medium pl-5">
                                        {submission.user.name}
                                    </TableCell>
                                    <TableCell>
                                        {submission.user.email}
                                    </TableCell>
                                    <TableCell>
                                        {submission.form.title}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            submission.updatedAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            submission.createdAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button asChild>
                                            <Link
                                                href={`/admin/submissions/${submission.id}`}>
                                                View
                                            </Link>
                                        </Button>
                                        <Button asChild variant={"destructive"}>
                                            <Link
                                                href={
                                                    "/admin/submissions/delete"
                                                }>
                                                Delete
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* meant for searching all submissions as required */}
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardContent>
            </Card>
        </div>
    );
}
