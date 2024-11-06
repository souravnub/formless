"use client";
import { deleteLog, getLogs, undoLog } from "@/actions/logging";
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
import { Input } from "@/components/ui/input";
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
import { log } from "console";
import { set } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

type Logs = Prisma.LogGetPayload<{
    include: { user: true; };
}>;

export default function LogsPage() {
    const [Logs, setLogs] = useState<Logs[]>([]);
    const [selectedLogs, setSelectedLogs] = useState<number[]>(
        []
    );
    const [logFilter, setlogFilter] = useState<string | undefined>(undefined);
    const [userFilter, setUserFilter] = useState<string | undefined>(undefined);
    const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [currentDateRange, setCurrentDateRange] = useState<
        DateRange | undefined
    >(undefined);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    

    function fetchAndSetLogs(page = 1) {
        setLoading(true);
        getLogs({ dateRange: currentDateRange, logFilter, userFilter, typeFilter, page, itemsPerPage }).then(
            (res) => {
                setLogs(res);
                setLoading(false);
            }
        );
    }

    useEffect(() => {
        fetchAndSetLogs();
    }, [currentDateRange, logFilter, userFilter, typeFilter]);

    return (
        <div className="container">
            <CustomBreadcrumb
                className="my-3"
                list={[
                    { name: "Dashboard", href: "/admin" },
                    { name: "Logs", href: "/admin/logs" },
                ]}
            />
            <div className="flex justify-between my-5">
                <h1 className="text-xl font-medium items-center">
                    Manage Logs
                </h1>
                <div className="flex gap-4 items-center">
                    {selectedLogs.length > 0 && (
                        <Button variant={"destructive"}>
                            Delete
                        </Button>
                    )}
                    <Input 
                        type="text" 
                        placeholder="Search by user" 
                        value={userFilter || ""} 
                        onChange={(e) => setUserFilter(e.target.value || undefined)}>
                    </Input>
                    <Select
                        value={typeFilter || ""}
                        onValueChange={(val) => setTypeFilter(val)}>
                        <SelectTrigger className="flex gap-2">
                            <SelectValue placeholder="Filter by Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className="flex items-center justify-between">
                                    Types
                                    {typeFilter && (
                                        <Button
                                            onClick={() =>
                                                setTypeFilter(undefined)
                                            }
                                            variant={"destructive"}
                                            className="h-fit p-1 rounded-full ">
                                            <Cross1Icon className="size-3" />
                                        </Button>
                                    )}
                                </SelectLabel>
                                    <SelectItem value="FORM">
                                        FORM
                                    </SelectItem>
                                    <SelectItem value="FORM_SUBMISSION">
                                        FORM_SUBMISSION
                                    </SelectItem>
                                    <SelectItem value="USER">
                                        USER
                                    </SelectItem>
                                    <SelectItem value="USER_REQUEST">
                                        USER_REQUEST
                                    </SelectItem>
                                    
                                
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select
                        value={logFilter || ""}
                        onValueChange={(val) => setlogFilter(val)}>
                        <SelectTrigger className="flex gap-2">
                            <SelectValue placeholder="Filter by Action" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className="flex items-center justify-between">
                                    Actions
                                    {logFilter && (
                                        <Button
                                            onClick={() =>
                                                setlogFilter(undefined)
                                            }
                                            variant={"destructive"}
                                            className="h-fit p-1 rounded-full ">
                                            <Cross1Icon className="size-3" />
                                        </Button>
                                    )}
                                </SelectLabel>
                                    <SelectItem value="CREATE">
                                        CREATE
                                    </SelectItem>
                                    <SelectItem value="UPDATE">
                                        UPDATE
                                    </SelectItem>
                                    <SelectItem value="DELETE">
                                        DELETE
                                    </SelectItem>
                                    <SelectItem value="SUBMIT">
                                        SUBMIT
                                    </SelectItem>
                                    <SelectItem value="APPROVE">
                                        APPROVE
                                    </SelectItem>
                                    <SelectItem value="DENY">
                                        DENY
                                    </SelectItem>
                                
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                   
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
                                checked={
                                    selectedLogs.length === Logs.length &&
                                    Logs.length > 0
                                }
                                
                                
                                onCheckedChange={(isChecked) => {
                                    if (isChecked) {
                                        setSelectedLogs(
                                            Logs.map(
                                                (Log) => Number(Log.id)
                                            )
                                        );
                                    } else {
                                        setSelectedLogs([]);
                                    }
                                }}></Checkbox>
                        </TableHead>
                        <TableHead className="pl-5">User's Name</TableHead>
                        <TableHead>Contact Info</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Logs.map((Log) => (
                        <TableRow
                            key={Log.id}
                            className="hover:bg-none!important">
                            <TableCell>
                                <Checkbox
                                    checked={selectedLogs.includes(
                                        Number(Log.id)
                                    )}
                                    onCheckedChange={(isChecked) => {
                                        if (isChecked) {
                                            setSelectedLogs((prev) => [
                                                ...prev,
                                                Number(Log.id),
                                            ]);
                                        } else {
                                            setSelectedLogs((prev) =>
                                                prev.filter(
                                                    (id) =>
                                                        id !==
                                                        Number(Log.id)
                                                )
                                            );
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell className="font-medium pl-5">
                                {Log.user.name}
                            </TableCell>
                            <TableCell>{Log.user.email}</TableCell>
                            <TableCell>{Log.action}</TableCell>
                            <TableCell>{Log.objectType}</TableCell>
                            <TableCell>
                                {new Date(
                                    Log.createdAt
                                ).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="flex gap-2">
                                <Button asChild>
                                    <Link
                                        href={`/admin/logs/${Log.id}`}>
                                        Details
                                    </Link>
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant={"outline"}>
                                            Undo
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Undo Action
                                            </DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to undo
                                                action?
                                            </DialogDescription>
                                            <span>
                                                LogId : {Log.id},
                                            </span>
                                            <span>
                                                Action: {Log.action} {Log.objectType}
                                                
                                            </span>
                                            <span>
                                                Performed by:{" "}
                                                {Log.user.name}({Log.user.email})
                                            </span>
                                            
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button
                                                variant={"default"}
                                                onClick={async () => {
                                                    const res =
                                                        await undoLog(
                                                            Log.id
                                                        );
                                                        await deleteLog(Log.id);
                                                    fetchAndSetLogs();
                                                    toast({
                                                        description:
                                                            res.message,
                                                        variant: res.success
                                                            ? "default"
                                                            : "destructive",
                                                    });
                                                }}
                                                >
                                                UNDO
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant={"destructive"}>
                                            Delete
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Delete Log
                                            </DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete
                                                Log?
                                            </DialogDescription>
                                            <span>
                                                LogId : {Log.id},
                                            </span>
                                            <span>
                                                Action: {Log.action} {Log.objectType}
                                                
                                            </span>
                                            <span>
                                                Performed by:{" "}
                                                {Log.user.name}({Log.user.email})
                                            </span>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button
                                                variant={"destructive"}
                                                onClick={async () => {
                                                    const res =
                                                        await deleteLog(
                                                            Log.id
                                                        );
                                                    fetchAndSetLogs();
                                                    toast({
                                                        description:
                                                            res.message,
                                                        variant: res.success
                                                            ? "default"
                                                            : "destructive",
                                                    });
                                                }}
                                                >
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
            
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => {
                            if (currentPage > 1) {
                                setCurrentPage((prev) => prev - 1);
                                fetchAndSetLogs(currentPage - 1);
                            }
                        }} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => {
                            setCurrentPage((prev) => prev + 1);
                            fetchAndSetLogs(currentPage + 1)
                        }} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
