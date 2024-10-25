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
    try {
        await prisma.userRequest.delete({ where: { id: requestId } });
        return { success: true, message: "Request deleted!" };
    } catch (err) {
        console.log(err);
        return { success: false, message: "Error while deleting request in DB" };
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

