import React from "react";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
const supervisors =[
    {
        id: 1,
        name: "Elias Irons",
        email: "eirons@kbm.ca",
        activity: "Active 5 minutes ago"},
        {
            id: 2,
            name: "Sourav Kumar",
            email: "skumar@kbm.ca",
            activity: "Active 2 Hours ago"
        }
]
const employees =[
    {
        id: 1,
        name: "Chris Duke",
        email: "cduke@kbm.ca",
        activity: "Active 20 minutes ago"},
        {
            id: 2,
            name: "Amrinder Singh Khangura",
            email: "akhangura@kbm.ca",
            activity: "Active 7 Hours ago"
        }
]
const UsersPage = () => {
    return (
        <div className="container">
            <CustomBreadcrumb
                className="my-3"
                list={[
                    { name: "Dashboard", href: "/admin" },
                    { name: "Users", href: "/admin/forms" },
                ]}
            />
            <div className="flex justify-between my-5">
                <h1 className="text-xl font-medium items-center">
                    Manage Users
                </h1>

                <Button asChild className="flex gap-2">
                    <Link href={"/admin/users/add"}>Add User</Link>
                </Button>
            </div>
            <Card className="mb-2">
                <CardHeader>Supervisors</CardHeader>
                <CardContent>
                <Table className="border">
                <TableCaption>All Team Supervisors</TableCaption>
                <TableHeader className="bg-accent/70">
                    <TableRow>
                        <TableHead className="pl-5">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {supervisors.map(({ id, name, email, activity }) => (
                        <TableRow key={id} className="hover:bg-none!important">
                            <TableCell className="font-medium pl-5">
                                {name}
                            </TableCell>
                            <TableCell>{email}</TableCell>
                            <TableCell>{activity}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button>
                                <Link href={"/admin/users/edit"}>Edit</Link>
                                    </Button>
                                <Button variant={"destructive"}>
                                    <Link href={"/admin/users/delete"}>Delete</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>Employees</CardHeader>
                <CardContent>
                <Table className="border">
                <TableCaption>All Employees</TableCaption>
                <TableHeader className="bg-accent/70">
                    <TableRow>
                        <TableHead className="pl-5">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map(({ id, name, email, activity }) => (
                        <TableRow key={id} className="hover:bg-none!important">
                            <TableCell className="font-medium pl-5">
                                {name}
                            </TableCell>
                            <TableCell>{email}</TableCell>
                            <TableCell>{activity}</TableCell>
                            <TableCell className="flex gap-2">
                            <Button>
                                <Link href={"/admin/users/edit"}>Edit</Link>
                                    </Button>
                                <Button variant={"destructive"}>
                                    <Link href={"/admin/users/delete"}>Delete</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                </CardContent>
            </Card>
        </div>
    )
};

export default UsersPage;
