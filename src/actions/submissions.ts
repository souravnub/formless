"use server";

import prisma from "@/db";
import { DateRange } from "react-day-picker";

export const getSubmissions = async (dateRange?: DateRange) => {
    if (dateRange) {
        const submissions = await prisma.formSubmission.findMany({
            include: {
                user: true,
                form: true,
            },
            where: {
                createdAt: {
                    lte: dateRange.to,
                    gte: dateRange.from,
                },
            },
        });
        return submissions;
    }
    const submissions = await prisma.formSubmission.findMany({
        include: {
            user: true,
            form: true,
        },
    });
    return submissions;
};
