"use server";

import prisma from "@/db";
import { auth } from "@/lib/auth";
import { dateRangeOptions } from "@rjsf/utils";
import { revalidatePath } from "next/cache";
import { DateRange } from "react-day-picker";

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
    const a = await auth();
    if (!a?.user) {
        return { success: false, message: "Not authorized" };
    }
    try {
        await prisma.formSubmission.delete({
            where: {
                id: submissionId,
            },
        });
        return { success: true, message: "Submission deleted" };
    } catch (err) {
        return { success: false, message: "Error while deleting submission" };
    }
};
