import UserForm from "@/components/domains/user/form";
import prisma from "@/db";
import React from "react";

const FormSubmissionPage = async ({ params }: { params: { id: string } }) => {
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
        <div>
            <UserForm form={form} />
        </div>
    );
};

export default FormSubmissionPage;
