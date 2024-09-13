"use server";

import prisma from "@/db";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";

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

export const updateUser = async (userId: string, userData: CreateUserInput) => {
    const session = await auth();

    if(!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    const { name, email, role, password } = userData;


    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                email,
                role,
                password,
            },
        });
        return { success: true, message: "User updated!" };
    }
    catch (err) {
        return { success: false, message: "Error while updating user in DB"}
    }
}

export const getUsers = async () => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    try {
        const users = await prisma.user.findMany();
        return { success: true, data: users };
    } catch (err) {
        return { success: false, message: "Error while fetching users from DB" };
    }
};

export const getUser = async (userId: string) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    try {
        const user = await prisma.user.findFirst({ where: { id: userId } });
        return { success: true, data: user };
    } catch (err) {
        return { success: false, message: "Error while fetching user from DB" };
    }
};

export const searchUsers = async (query: string) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [{ name: { contains: query } }, { email: { contains: query } },],
            },
        });
        return { success: true, data: users };
    } catch (err) {
        return { success: false, message: "Error while fetching users from DB" };
    }
}

interface CreateUserInput {
    name: string;
    email: string;
    role: "USER" | "SUPERVISOR";
    password: string;
}
