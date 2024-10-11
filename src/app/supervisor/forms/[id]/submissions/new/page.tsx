import UserForm from "@/components/domains/user/form";
import prisma from "@/db";
import React from "react";
import CopyPastUserTable from "@/components/CopyPastUserTable";
import { getUsers } from "@/actions/users";

const FormSubmissionPage = async ({ params }: { params: { id: string } }) => {
  const users = await getUsers();
  // page where the user will be submitting a submission for the form
  const form = await prisma.form.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!form) {
    return <p>No form found</p>;
  }

  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <UserForm form={form} />
      </div>
      <div className="min-w-[30%]">
        <CopyPastUserTable />
      </div>
    </div>
  );
};

export default FormSubmissionPage;
