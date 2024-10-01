"use server";

import prisma from "@/db";
import { DateRange } from "react-day-picker";

export const getSubmissions = async (dateRange?: DateRange) => {
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
        },
    });
    return submissions;
};
