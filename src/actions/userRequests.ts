/**
 * Prisma ORM Documentation: https://www.prisma.io/docs
 * 
 * Formless utilizes Prisma ORM to interact with the Postgre database via
 * prisma schema, database queries, and migrations
 */

"use server";

import prisma from "@/db";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { createLog } from "./logging";
import { createUser } from "./users";
import { Prisma } from "@prisma/client";

interface CreateRequestProps {
    name: string;
    email: string;
    password: string;
}

export const createRequest = async (formData: CreateRequestProps) => {
    try {
        const { name, email, password } = formData;

        await prisma.userRequest.create({
            data: {
                name,
                email: email.toLowerCase(),
                password,
            },
        });
        
        return { success: true, message: "Request created!" };
        
    } catch (err) {
        console.log(err);
        return { success: false, message: "Error while creating request in DB" };
    }
    
}

export const deleteRequest = async (requestId: string) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN" || !session.user.id) {
        return { success: false, message: "Not authorized" };
    }
    
    try {
        await prisma.userRequest.delete({ where: { id: requestId } });
        
        return { success: true, message: "Request deleted!" };
    } catch (err) {
        console.log(err);
        return { success: false, message: "Error while deleting request in DB" };
    }
}

export const approveRequest = async (requestId: string) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN" || !session.user.id) {
        return { success: false, message: "Not authorized" };
    }
    
    try {
        const request = await prisma.userRequest.findUnique({ where: { id: requestId } });
        const name = request?.name;
        const email = request?.email;
        const password = request?.password;

        if (!name || !email || !password) {
            return { success: false, message: "Invalid request data" };
        }
        
        await createUser({ name, email, role: "USER", password });
        await deleteRequest(requestId);
        await createLog(
            {
                userId: session.user.id,
                action: "APPROVE",
                objectType: "USER_REQUEST",
                objectId: requestId,
                info: {"info": {"user" : name + "(" + request.id + ")", "approvedBy" : session.user.name + "(" + session.user.id + ")"}},
                prevState: request ?? Prisma.JsonNull,
            },
        )
        return { success: true, message: "Request approved!" };
    } catch (err) {
        console.log(err);
        return { success: false, message: "Error while approving request in DB" };
    }
}

export const denyRequest = async (requestId: string) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN" || !session.user.id) {
        return { success: false, message: "Not authorized" };
    }
    
    try {
        const request = await prisma.userRequest.findUnique({ where: { id: requestId } });
        await deleteRequest(requestId);
        await createLog(
            {
                userId: session.user.id,
                action: "DENY",
                objectType: "USER_REQUEST",
                objectId: requestId,
                info: {"info": {"user" : request?.name + "(" + requestId + ")", "deniedBy" : session.user.name + "(" + session.user.id + ")"}},
                prevState: request ?? Prisma.JsonNull,
            },
        )
        return { success: true, message: "Request denied!" };
    } catch (err) {
        console.log(err);
        return { success: false, message: "Error while denying request in DB" };
    }
}

export const getRequests = async () => {
    try{
        const requests = await prisma.userRequest.findMany();
        return requests;
    }
    catch(err){
        console.log(err);
        return { success: false, message: "Error while fetching requests from DB" };
    }
    
}

export const getRequestByEmail = async (requestEmail: string) => {
    try{
        const request = await prisma.userRequest.findFirst({ where: { email: requestEmail } });
        return request;
    }
    catch(err){
        console.log(err);
        return { success: false, message: "Error while fetching request from DB" };
    }
    
}

