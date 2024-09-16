import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  const forms = [
    {
      formName: "PPE Checklist",
      formCategory: "Health & Safety",
      dueDate: "2024-09-16",
      submission: "Submitted",
    },
    {
        formName: "Equipment Inspection",
        formCategory: "Health & Safety",
        dueDate: "2024-09-16",
        submission: "Open",
    },
    {
        formName: "Fire Extinguisher Form",
        formCategory: "Fire Extinguisher",
        dueDate: "2024-09-16",
        submission: "Submitted",
    },
    {
        formName: "Incident Report",
        formCategory: "Employee Reports",
        dueDate: "N/A",
        submission: "Open",
    },
  ]
  
  export function UserTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Form Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead >Submission Status</TableHead>
            <TableHead >Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form) => (
            <TableRow key={form.formName}>
              <TableCell className="font-medium">{form.formName}</TableCell>
              <TableCell>{form.formCategory}</TableCell>
              <TableCell>{form.dueDate}</TableCell>
              <TableCell>{form.submission}</TableCell>
              <TableCell>
              <Button className="w-[100px] bg-orange-500 text-white">{form.submission === "Submitted" ? "Edit" : "Create"}</Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  