"use client";
import handleDownload  from "@/actions/handleDownload";
import handlePDFDownload from "@/actions/handlePDFDownload";
import handleExcelDownload from "@/actions/handleExcelDownload";
import { getForms } from "@/actions/forms";
import { deleteSubmission, getSubmissions } from "@/actions/submissions";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { DatePickerWithRange } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Prisma } from "@prisma/client";
import { Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

type Submissions = Prisma.FormSubmissionGetPayload<{
    include: { user: true; form: true };
}>;

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState<Submissions[]>([]);
    const [selectedSubmissions, setSelectedSubmissions] = useState<number[]>(
        []
    );
    const [formFilter, setFormFilter] = useState<string | undefined>(undefined);
    const [currentForms, setCurrentForms] = useState<
        { title: string; id: string }[]
    >([]);
    const [currentDateRange, setCurrentDateRange] = useState<
        DateRange | undefined
    >(undefined);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        getForms().then((res) => {
            const forms = res.map((form) => ({
                id: form.id,
                title: form.title,
            }));
            setCurrentForms(forms);
        });
    }, []);

    function fetchAndSetSubmissions() {
        getSubmissions({ dateRange: currentDateRange, formFilter }).then(
            (res) => {
                setSubmissions(res);
                setLoading(false);
            }
        );
    }

    useEffect(() => {
        fetchAndSetSubmissions();
    }, [currentDateRange, formFilter]);

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
                <div className="flex gap-4 items-center">
                    {selectedSubmissions.length > 0 && (
                        <Button>
                            <Link
                                href={`/admin/submissions/pdf?submissions=${selectedSubmissions.join(
                                    ","
                                )}`}>
                                Generate Report
                            </Link>
                        </Button>
                    )}
                    <Select
                        value={formFilter || ""}
                        onValueChange={(val) => setFormFilter(val)}>
                        <SelectTrigger className="flex gap-2">
                            <SelectValue placeholder="Select a Form" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className="flex items-center justify-between">
                                    Forms
                                    {formFilter && (
                                        <Button
                                            onClick={() =>
                                                setFormFilter(undefined)
                                            }
                                            variant={"destructive"}
                                            className="h-fit p-1 rounded-full ">
                                            <Cross1Icon className="size-3" />
                                        </Button>
                                    )}
                                </SelectLabel>
                                {currentForms.map((form) => (
                                    <SelectItem key={form.id} value={form.id}>
                                        {form.title}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* we can use shadcn data-table to enable filtering and sorting */}
                    <DatePickerWithRange
                        currentDateRange={currentDateRange}
                        onChange={setCurrentDateRange}
                    />
                </div>
            </div>
            <Table className="border">
                <TableHeader className="bg-accent/70">
                    <TableRow>
                        <TableHead className="w-10">
                            <Checkbox
                                onCheckedChange={(isChecked) => {
                                    if (isChecked) {
                                        setSelectedSubmissions(
                                            submissions.map(
                                                (submission) => submission.id
                                            )
                                        );
                                    } else {
                                        setSelectedSubmissions([]);
                                    }
                                }}></Checkbox>
                        </TableHead>
                        <TableHead className="pl-5">User's Name</TableHead>
                        <TableHead>Contact Info</TableHead>
                        <TableHead>Form Name</TableHead>
                        <TableHead>Date Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {submissions.map((submission) => (
                        <TableRow
                            key={submission.id}
                            className="hover:bg-none!important">
                            <TableCell>
                                <Checkbox
                                    checked={selectedSubmissions.includes(
                                        submission.id
                                    )}
                                    onCheckedChange={(isChecked) => {
                                        if (isChecked) {
                                            setSelectedSubmissions((prev) => [
                                                ...prev,
                                                submission.id,
                                            ]);
                                        } else {
                                            setSelectedSubmissions((prev) =>
                                                prev.filter(
                                                    (prevSub) =>
                                                        prevSub !==
                                                        submission.id
                                                )
                                            );
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell className="font-medium pl-5">
                                {submission.user.name}
                            </TableCell>
                            <TableCell>{submission.user.email}</TableCell>
                            <TableCell>{submission.form.title}</TableCell>
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
                                <Button onClick={() => handlePDFDownload({submissionId:submission.id})}>
                                    PDF
                                </Button>
                                <Button onClick={() => handleDownload({submissionId:submission.id})}>
                                    Doc
                                </Button>
                                <Button onClick={() => handleExcelDownload({submissionId:submission.id})}>
                                    Excel
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant={"destructive"}>
                                            Delete
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Delete Submission
                                            </DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete
                                                submission?
                                            </DialogDescription>
                                            <span>
                                                SubmissionId : {submission.id},
                                            </span>
                                            <span>
                                                Submission made by:{" "}
                                                {submission.user.name}
                                            </span>
                                            <span>
                                                user email:{" "}
                                                {submission.user.email}
                                            </span>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button
                                                variant={"destructive"}
                                                onClick={async () => {
                                                    const res =
                                                        await deleteSubmission(
                                                            submission.id
                                                        );
                                                    fetchAndSetSubmissions();
                                                    toast({
                                                        description:
                                                            res.message,
                                                        variant: res.success
                                                            ? "default"
                                                            : "destructive",
                                                    });
                                                }}>
                                                Delete
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
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
        </div>
    );
}
