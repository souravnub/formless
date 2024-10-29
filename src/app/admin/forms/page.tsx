import { getForms } from "@/actions/forms";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import DeleteFormDialog from "@/components/domains/dialogs/DeleteFormDialog";
import GenerateFormDialog from "@/components/domains/dialogs/GenerateFormDialog";
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
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default async function FormsPage() {
  const forms = await getForms();

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
        <h1 className="text-xl font-medium items-center">Manage Forms</h1>

        <div className="flex gap-4">
          <Button asChild className="flex gap-2" variant={"outline"}>
            <Link href={"/admin/forms/add"}>Add New Form</Link>
          </Button>
          <GenerateFormDialog>
            <Button className="flex gap-2">
              Generate Form
              <Sparkles fill="white" className="size-4" />
            </Button>
          </GenerateFormDialog>
        </div>
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
          {forms.map((form) => (
            <TableRow key={form.id} className="hover:bg-none!important">
              <TableCell className="font-medium pl-5">{form.title}</TableCell>
              <TableCell>
                {new Date(form.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{form.description}</TableCell>
              <TableCell className="flex gap-2">
                <DeleteFormDialog
                  id={form.id}
                  description={form.description}
                  title={form.title}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
