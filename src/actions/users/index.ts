"use server";

import prisma from "@/db";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { CreateUserInput, SearchUsersRes } from "./types";

const fieldsWithoutPassword = {
    email: true,
    id: true,
    name: true,
    role: true,
};

export const createUser = async (userData: CreateUserInput) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    const { name, email, role, password } = userData;
    const salt = await bcrypt.genSalt();

    const hashedPass = await bcrypt.hash(password, salt);

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                role,
                password: hashedPass,
            },
        });
        return { success: true, message: "User created!" };
    } catch (err) {
        return { success: false, message: "Error while creating user in DB" };
    }
};

export const deleteUser = async (userId: string) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    try {
        await prisma.user.delete({ where: { id: userId } });
        return { success: true, message: "User deleted!" };
    } catch (err) {
        return { success: false, message: "Error while deleting user in DB" };
    }
};

export const updateUser = async (userId: string, userData: Partial<CreateUserInput>) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: userData,
        });
        return { success: true, message: "User updated!" };
    } catch (err) {
        return { success: false, message: "Error while updating user in DB" };
    }
};

export const getUsers = async () => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    try {
        const users = await prisma.user.findMany({
            select: fieldsWithoutPassword,
        });
        return { success: true, data: users };
    } catch (err) {
        return {
            success: false,
            message: "Error while fetching users from DB",
        };
    }
};

export const getUser = async (userId: string) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            // omitting password
            select: fieldsWithoutPassword,
        });
        if (!user) {
            return { success: false, message: "No user found!" };
        }
        return { success: true, data: user };
    } catch (err) {
        return { success: false, message: "Error while fetching user from DB" };
    }
};

export const searchUsers = async (query: string): Promise<SearchUsersRes> => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [{ name: { contains: query } }, { email: { contains: query } }],
            },
            // omitting password
            select: fieldsWithoutPassword,
        });
        return { success: true, data: users };
    } catch (err) {
        return {
            success: false,
            message: "Error while fetching users from DB",
        };
    }
};
