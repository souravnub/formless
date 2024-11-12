"use server";

import prisma from "@/db";
import { Action, ObjectType, Prisma } from ".prisma/client";
import { DateRange } from "react-day-picker";

interface CreateLogProps {
    userId: string;
    action: Action;
    objectType: ObjectType;
    objectId: string;
    info: Prisma.InputJsonValue | typeof Prisma.JsonNull;
    prevState: Prisma.InputJsonValue | typeof Prisma.JsonNull;
}

export const createLog = async (logData: CreateLogProps) => {
    const { userId, action, objectType, objectId, info, prevState } = logData;
    try {
        await prisma.log.create({
            data: {
                userId,
                action,
                objectType,
                objectId,
                info,
                prevState,
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
            },
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
};

export const undoLog = async (logId: string) => {
    const log = await prisma.log.findUnique({
        where: {
            id: logId,
        },
    });
    if (!log) {
        return { success: false, message: "Log not found" };
    }

    switch (log.action) {
        case "CREATE":
            if (log.objectType === "USER") {
                await prisma.user.delete({
                    where: {
                        id: log.objectId,
                    },
                });
            }
            if (log.objectType === "FORM") {
                await prisma.form.delete({
                    where: {
                        id: log.objectId,
                    },
                });
            }
            if (log.objectType === "FORM_SUBMISSION") {
                await prisma.formSubmission.delete({
                    where: {
                        id: log.objectId,
                    },
                });
            }
            if (log.objectType === "USER_REQUEST") {
                await prisma.userRequest.delete({
                    where: {
                        id: log.objectId,
                    },
                });
            }
            break;

        case "UPDATE":
            if (log.objectType === "USER") {
                await prisma.user.update({
                    where: {
                        id: log.objectId,
                    },
                    data: log.prevState as Prisma.UserUpdateInput,
                });
            }
            if (log.objectType === "FORM") {
                await prisma.form.update({
                    where: {
                        id: log.objectId,
                    },
                    data: log.prevState as Prisma.FormUpdateInput,
                });
            }
            if (log.objectType === "FORM_SUBMISSION") {
                await prisma.formSubmission.update({
                    where: {
                        id: log.objectId,
                    },
                    data: log.prevState as Prisma.FormSubmissionUpdateInput,
                });
            }
            if (log.objectType === "USER_REQUEST") {
                await prisma.userRequest.update({
                    where: {
                        id: log.objectId,
                    },
                    data: log.prevState as Prisma.UserRequestUpdateInput,
                });
            }
            break;

        case "DELETE":
            if (log.objectType === "USER") {
                await prisma.user.create({
                    data: log.prevState as Prisma.UserCreateInput,
                });
            }
            if (log.objectType === "FORM") {
                await prisma.form.create({
                    data: log.prevState as Prisma.FormCreateInput,
                });
            }
            if (log.objectType === "FORM_SUBMISSION") {
                await prisma.formSubmission.create({
                    data: log.prevState as Prisma.FormSubmissionCreateInput,
                });
            }
            if (log.objectType === "USER_REQUEST") {
                await prisma.userRequest.create({
                    data: log.prevState as Prisma.UserRequestCreateInput,
                });
            }
            break;

        case "APPROVE":
            await prisma.userRequest.create({
                data: log.prevState as Prisma.UserRequestCreateInput,
            });

            await prisma.user.delete({
                where: {
                    id: log.objectId,
                },
            });
            break;

        case "DENY":
            await prisma.userRequest.create({
                data: log.prevState as Prisma.UserRequestCreateInput,
            });
            break;

        case "SUBMIT":
            await prisma.formSubmission.delete({
                where: {
                    id: log.objectId,
                },
            });
            break;

        default:
            return { success: false, message: "Error has occured" };
    }
    return { success: true, message: "Log undone successfully" };
};

type GetLogsProps = {
    dateRange?: DateRange;
    logFilter?: string;
    userFilter?: string;
    typeFilter?: string;
    page?: number;
    itemsPerPage?: number;
};
