"use server";

import prisma from "@/db";
import { Action, ObjectType, Prisma } from ".prisma/client";

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

export const getLogs = async () => {
    try{
        const logs = await prisma.log.findMany();
        return logs;
    }
    catch(err){
        console.log(err);
        return { success: false, message: "Error while fetching logs from DB" };
    }     
};