"use server";

import prisma from "@/db";
import { Action, ObjectType, Prisma } from ".prisma/client";
import { DateRange } from "react-day-picker";

interface CreateLogProps{
    userId: string;
    action: Action;
    objectType: ObjectType;
    objectId: string;
    info: Prisma.InputJsonValue | typeof Prisma.JsonNull;
}

export const createLog = async (logData: CreateLogProps) => {
    
    const { userId, action, objectType, objectId, info } = logData;
    try {
        await prisma.log.create({
            data: {
                userId,
                action,
                objectType,
                objectId,
                info,
            },
        });
        return { success: true };
    } catch (err) {
        console.log(err);
        return { success: false };
    }
};

export const getLogs = async ({
    dateRange,
    logFilter,
    userFilter,
    typeFilter,
    page = 1,
    itemsPerPage = 10,
}: GetLogsProps) => {
    const logs = await prisma.log.findMany({
        include: {
            user: true,
        },
        where: {
            createdAt: {
                lte: dateRange?.to,
                gte: dateRange?.from,
            },
            action: {
                equals: logFilter as Action,
            },
            objectType: {
                equals: typeFilter as ObjectType,
            },
            user: {
                name: {
                    contains: userFilter,
                    mode: "insensitive",
                },
            }
        },
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
    });
    return logs;
};

export const deleteLog = async (logId: string) => {
    try {
        await prisma.log.delete({
            where: {
                id: logId,
            },
        });
        return { success: true, message: "Log deleted successfully" };
    } catch (err) {
        console.log(err);
        return { success: false, message: "Error occurred while deleting log" };
    }
}

type GetLogsProps = {
    dateRange?: DateRange;
    logFilter?: string;
    userFilter?: string;
    typeFilter?: string;
    page?: number;
    itemsPerPage?: number;
};