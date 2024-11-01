import { User } from './../../node_modules/.prisma/client/index.d';
/**
 * Prisma ORM Documentation: https://www.prisma.io/docs
 * 
 * Formless utilizes Prisma ORM to interact with the Postgre database via
 * prisma schema, database queries, and migrations
 */

"use server";

import prisma from "@/db";
import { auth } from "@/lib/auth";
import { dateRangeOptions } from "@rjsf/utils";
import { revalidatePath } from "next/cache";
import { DateRange } from "react-day-picker";
import { createLog } from "./logging";

type GetSubmissonsProps = {
    dateRange?: DateRange;
    formFilter?: string;
};

export const getSubmissions = async ({
    dateRange,
    formFilter,
}: GetSubmissonsProps) => {
    const submissions = await prisma.formSubmission.findMany({
        include: {
            user: true,
            form: true,
        },
        where: {
            createdAt: {
                lte: dateRange?.to,
                gte: dateRange?.from,
            },
            form: {
                id: formFilter,
            },
        },
    });
    return submissions;
};

export const getSubmissionsCount = async ({
    dateRange,
    formFilter,
}: GetSubmissonsProps) => {
    const count = await prisma.formSubmission.count({
        where: {
            // createdAt: {
            //     lte: dateRange?.to,
            //     gte: dateRange?.from,
            // },
            form: {
                title: formFilter,
            },
        },
    });
    return count;
};

export const deleteSubmission = async (submissionId: number) => {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN" || !session.user.id) {
        return { success: false, message: "Not authorized" };
      }
    try {
        const submission = await prisma.formSubmission.delete({
            where: {
                id: submissionId,
            },
        });
        
        const form = await prisma.form.findUnique({
            where: {
                id: submission.formId,
            },
        });
        await createLog({
            userId: session.user.id,
            action: "DELETE",
            objectType: "FORM_SUBMISSION",
            objectId: submissionId.toString(),
            info: {"info": {"formTitle" : form?.title, "submittedBy" : submission.userId, "deletedBy": session.user.name + "(" + session.user.id + ")"}},
        });
        return { success: true, message: "Submission deleted" };
    } catch (err) {
        return { success: false, message: "Error while deleting submission" };
    }
};
