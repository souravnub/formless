/**
 * Prisma ORM Documentation: https://www.prisma.io/docs
 *
 * Formless utilizes Prisma ORM to interact with the Postgre database via
 * prisma schema, database queries, and migrations
 */

"use server";

import prisma from "@/db";
import { auth } from "@/lib/auth";
import { UiSchema } from "@rjsf/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { RoleType } from ".prisma/client";
import { createLog } from "./logging";

interface CreateFormProps {
    title: string;
    description: string;
    properties: any;
    uiSchema?: UiSchema;
    role: RoleType;
    requiredFields: string[];
}

export const createForm = async (formData: CreateFormProps) => {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN" || !session.user.id) {
        return { success: false, message: "Not authorized" };
    }

    const { title, description, properties, uiSchema, role, requiredFields } = formData;

    try {
        const form = await prisma.form.create({
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
                role,
            },
        });

        await createLog({
            userId: session.user.id,
            action: "CREATE",
            objectType: "FORM",
            objectId: form.id,
            info: {
                info: {
                    title: form.title,
                    createdBy: session.user.name + "(" + session.user.id + ")",
                    formRole: form.role,
                    description: form.description,
                },
            },
            prevState: Prisma.JsonNull,
        });
        revalidatePath("/admin/forms");
    } catch (err) {
        console.log(err);
        return { success: false, message: "Error while creating form in DB" };
    }
    redirect("/admin/forms");
};

export const deleteForms = async (formId: string) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN" || !session.user.id) {
        return { success: false, message: "Not authorized" };
    }

    try {
        const form = await prisma.form.delete({
            where: {
                id: formId,
            },
        });

        await createLog({
            userId: session.user.id,
            action: "DELETE",
            objectType: "FORM",
            objectId: formId,
            info: {
                info: {
                    title: form.title,
                    deletedBy: session.user.name + "(" + session.user.id + ")",
                    formRole: form.role,
                    description: form.description,
                },
            },
            prevState: form,
        });
        revalidatePath("/admin/forms");
        return { success: true, message: "Form deleted!" };
    } catch (err) {
        console.log(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2003") {
                return {
                    success: false,
                    message: "Submissions on this form should be deleted first",
                };
            }
        }
        return { success: false, message: "Error while deleting form in DB" };
    }
};

export const getForms = async () => {
    const session = await auth();
    const forms = await prisma.form.findMany({
        //Admins can see all forms, users can only see forms they have access to
        where: session?.user.role === "ADMIN" ? {} : { role: session?.user.role },
    });
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
        const submission = await prisma.formSubmission.create({
            data: {
                submissions: formValues,
                formId,
                userId: session?.user.id,
            },
        });

        const form = await prisma.form.findUnique({
            where: {
                id: formId,
            },
        });
        await createLog({
            userId: session.user.id,
            action: "SUBMIT",
            objectType: "FORM_SUBMISSION",
            objectId: formId,
            info: { info: { formTitle: form?.title, submittedBy: session.user.name + "(" + session.user.id + ")" } },
            prevState: submission,
        });
        revalidatePath("/user");
        return { success: true, message: "form submitted successfully!" };
    } catch (err) {
        return { success: false, message: "Error while submitting form" };
    }
};
