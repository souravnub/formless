"use server";

import prisma from "@/db";
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
