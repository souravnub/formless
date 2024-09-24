"use server";

import prisma from "@/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createForm = async (formData: any) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    const { title, description, properties } = formData;

    try {
        await prisma.form.create({
            data: {
                title,
                description,
                schema: {
                    type: "object",
                    properties,
                },
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

// interface CreateFormInput {
//     title: string;
//     description: string;
//     properties: {
//         title: string;
//         type: string;
//         default: string;
//     }[];
// }
