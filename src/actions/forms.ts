"use server";

import prisma from "@/db";
import { auth } from "@/lib/auth";
import { UiSchema } from "@rjsf/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateFormProps {
    title: string;
    description: string;
    properties: any;
    uiSchema?: UiSchema;
    requiredFields: string[];
}

export const createForm = async (formData: CreateFormProps) => {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN" || !session.user.id) {
        return { success: false, message: "Not authorized" };
    }

    const { title, description, properties, uiSchema, requiredFields } =
        formData;

    try {
        await prisma.form.create({
            data: {
                title,
                createdBy: session.user.id,
                description,
                schema: {
                    type: "object",
                    required: requiredFields,
                    properties,
                },
                uiSchema,
            },
        });
        revalidatePath("/admin/forms");
        // return { success: true, message: "Form created!" };
    } catch (err) {
        console.log(err);
        return { success: false, message: "Error while creating form in DB" };
    }
    redirect("/admin/forms");
};

export const deleteForms = async (formId: string) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    try {
        await prisma.form.delete({
            where: {
                id: formId,
            },
        });
        return { success: true, message: "Form deleted!" };
    } catch (err) {
        return { success: false, message: "Error while deleting form in DB" };
    }
};

export const getForms = async () => {
    const forms = await prisma.form.findMany();
    return forms;
};


export const getForm = async (formId: string) => {
    const form = await prisma.form.findUnique({
        where: {
            id: formId,
        },
    });
    return form;
};

export const submitForm = async (formId: string, formValues: any) => {
    const session = await auth();

    if (!session || !session.user.id) {
        return { success: false, message: "Not authorized" };
    }
    try {
        await prisma.formSubmission.create({
            data: {
                submissions: formValues,
                formId,
                userId: session?.user.id,
            },
        });
        revalidatePath("/user");
        return { success: true, message: "form submitted successfully!" };
    } catch (err) {
        return { success: false, message: "Error while submitting form" };
    }
};

export const getForm = async (formId: string) => {
    const form = await prisma.form.findUnique({
        where: {
            id: formId,
        },
    });
    return form;
};
