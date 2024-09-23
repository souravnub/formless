"use client";

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
import { useState, useEffect } from "react";
import { getForms, deleteForms } from "@/actions/forms";



// const forms = [
//     {
//         id: 1,
//         name: "Fire Extenguisher form",
//         createdBy: "sourav",
//         submissionsCount: 4,
//     },
//     {
//         id: 2,
//         name: "PPE Safty form",
//         createdBy: "chris",
//         submissionsCount: 100,
//     },
//     {
//         id: 3,
//         name: "On Site Safety form",
//         createdBy: "elias",
//         submissionsCount: 50,
//     },
// ];

export default function FormsPage() {
    const [forms, setForms] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const fetchForms = async () => {
        const forms = await getForms();
        setForms(forms);
        setLoading(false);
    };

    const handleDelete = async (formId: string) => {
        const confirmation = window.confirm("Are you sure you want to delete this form?"); // Can change this to a more stylish prompt

        if(confirmation){
            const res = await deleteForms(formId);
            if (res.success) {
                fetchForms();
            } else {
                alert(res.message);
            }
        } else{
            console.log("cancelled");
        }
        
        
    }


    useEffect(() => {
        fetchForms();
    }, []);
    
    return (
        <div className="container">
            <CustomBreadcrumb
                className="my-3"
                list={[
                    { name: "Dashboard", href: "/admin" },
                    { name: "Forms", href: "/admin/forms" },
                ]}
            />
            <div className="flex justify-between my-5">
                <h1 className="text-xl font-medium items-center">
                    Manage Forms
                </h1>

                <Button asChild className="flex gap-2">
                    <Link href={"/admin/forms/add"}>Add New Form</Link>
                </Button>
            </div>
            <Table className="border">
                <TableCaption>A list of forms</TableCaption>
                <TableHeader className="bg-accent/70">
                    <TableRow>
                        <TableHead className="pl-5">Name</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {forms.map((form: any) => (
                        <TableRow key={form.id} className="hover:bg-none!important">
                            <TableCell className="font-medium pl-5">
                                {form.title}
                            </TableCell>
                            <TableCell>{new Date(form.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>{form.description}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button>Edit</Button>
                                <Button variant={"destructive"} onClick={() => handleDelete(form.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
