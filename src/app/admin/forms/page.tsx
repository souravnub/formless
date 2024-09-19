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

const forms = [
    {
        id: 1,
        name: "Fire Extenguisher form",
        createdBy: "sourav",
        submissionsCount: 4,
    },
    {
        id: 2,
        name: "PPE Safty form",
        createdBy: "chris",
        submissionsCount: 100,
    },
    {
        id: 3,
        name: "On Site Safety form",
        createdBy: "elias",
        submissionsCount: 50,
    },
];

export default async function FormsPage() {
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
                        <TableHead>Created by</TableHead>
                        <TableHead>Submissions</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {forms.map(({ id, name, createdBy, submissionsCount }) => (
                        <TableRow key={id} className="hover:bg-none!important">
                            <TableCell className="font-medium pl-5">
                                {name}
                            </TableCell>
                            <TableCell>{createdBy}</TableCell>
                            <TableCell>{submissionsCount}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button>Edit</Button>
                                <Button variant={"destructive"}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
