"use server";
import { Prisma } from "@prisma/client";
import { CreateNotificationRes, GetNotificationsRes, SendNotificationProps } from "./type";
import { auth } from "@/lib/auth";
import prisma from "@/db";

export const getUserNotifications = async (): Promise<GetNotificationsRes> => {
    const session = await auth();
    if (!session) {
        return { success: false, message: "Not authorized" };
    }
    try {
        const userNotifications = await prisma.userNotification.findMany({
            include: { notification: true },
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, userNotifications };
    } catch (err) {
        return { success: false, message: "Error while fetching notifications" };
    }
};

export const createNotification = async (
    notificationData: Pick<Prisma.NotificationCreateInput, "description" | "link" | "type">
): Promise<CreateNotificationRes> => {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }
    try {
        const createdNotification = await prisma.notification.create({
            data: notificationData,
        });
        return { success: true, message: "Notification created", id: createdNotification.id };
    } catch (err) {
        return { success: false, message: "Error while creating notification" };
    }
};

export const sendNotification = async ({ userType, notificationId }: SendNotificationProps) => {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    try {
        const notificationReceivers = await prisma.user.findMany({
            where: { role: userType },
            select: { id: true },
        });
        const userNotifications = notificationReceivers.map((receiver) => ({
            userId: receiver.id,
            notificationId,
            isArchived: false,
        }));

        await prisma.$transaction(
            userNotifications.map((userNotification) => prisma.userNotification.create({ data: userNotification }))
        );

        return { success: true, message: `Notfiication sent to all ${userType}` };
    } catch (err) {
        return {
            success: false,
            message: "Error while sending notification",
        };
    }
};

export const archiveNotification = async (userId: string, notificationId: string) => {
    const session = await auth();
    if (!session) {
        return { success: false, message: "Not authorized" };
    }
    try {
        await prisma.userNotification.update({
            where: { notificationId_userId: { userId, notificationId } },
            data: {
                isArchived: true,
            },
        });

        return { success: true, message: "Notification archived" };
    } catch (err) {
        return { success: false, message: "Cannot archive notification" };
    }
};

export const setAllNotificationsToRead = async () => {
    const session = await auth();
    if (!session || !session.user.id) {
        return { success: false, message: "Not authorized" };
    }
    try {
        // INFO: Finding notifications based on just userId is not possible right now. Issue on prisma github: https://github.com/prisma/prisma/issues/16979
        // await prisma.userNotification.update({
        //     where: {  notificationId_userId: {userId: session.user.id} },
        //     data: {
        //         isRead: true,
        //     },
        // });

        const notReadNotifications = await prisma.userNotification.findMany({
            where: { userId: session.user.id, isRead: false },
            select: { userId: true, notificationId: true },
        });
        const readStatusUpdatePromises = notReadNotifications.map((notification) => {
            return prisma.userNotification.update({
                where: {
                    notificationId_userId: { userId: notification.userId, notificationId: notification.notificationId },
                },
                data: { isRead: true },
            });
        });

        await prisma.$transaction(readStatusUpdatePromises);

        return { success: true, message: "Notifications read" };
    } catch (err) {
        return { success: false, message: "Cannot set notifications to read" };
    }
};
