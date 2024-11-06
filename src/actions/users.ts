/**
 * Prisma ORM Documentation: https://www.prisma.io/docs
 *
 * Formless utilizes Prisma ORM to interact with the Postgre database via
 * prisma schema, database queries, and migrations
 */

"use server";
import { RoleType } from "@prisma/client";
import prisma from "@/db";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { hashPass } from "@/lib/utils";
import { createLog } from "./logging";

const fieldsWithoutPassword = {
    email: true,
    id: true,
    name: true,
    role: true,
};

export const createUser = async (userData: CreateUserInput) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN" || !session.user.id) {
        return { success: false, message: "Not authorized" };
    }

    const { name, email, role, password } = userData;
    const salt = await bcrypt.genSalt();

    const hashedPass = await bcrypt.hash(password, salt);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                role,
                password: hashedPass,
            },
        });
        await createLog({
            userId: session.user.id,
            action: "CREATE",
            objectType: "USER",
            objectId: user.id,
            info: {
                info: { user: name + "(" + user.id + ")", createdBy: session.user.name + "(" + session.user.id + ")" },
            },
        });
        return { success: true, message: "User created!" };
    } catch (err) {
        return { success: false, message: "Error while creating user in DB" };
    }
};

export const deleteUser = async (userId: string) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN" || !session.user.id) {
        return { success: false, message: "Not authorized" };
    }

    try {
        const user = await prisma.user.delete({ where: { id: userId } });
        await createLog({
            userId: session.user.id,
            action: "DELETE",
            objectType: "USER",
            objectId: userId,
            info: {
                info: {
                    user: user.name + "(" + user.id + ")",
                    deletedBy: session.user.name + "(" + session.user.id + ")",
                },
            },
        });
        return { success: true, message: "User deleted!" };
    } catch (err) {
        return { success: false, message: "Error while deleting user in DB" };
    }
};

export const updateUser = async (userId: string, userData: Partial<CreateUserInput>, shouldUpdatePass: boolean) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN" || !session.user.id) {
        return { success: false, message: "Not authorized" };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return { success: false, message: "User not found!" };
        }

        const updatedFields: Partial<CreateUserInput> = {};
        for (const key in userData) {
            if (userData[key as keyof CreateUserInput] !== user[key as keyof typeof user]) {
                updatedFields[key as keyof CreateUserInput] = userData[key as keyof CreateUserInput] as any;
            }
        }

        if (shouldUpdatePass) {
            const hashedPass = await hashPass(userData.password as string);
            updatedFields["password"] = hashedPass;
            await prisma.user.update({
                where: { id: userId },
                data: { ...userData, password: hashedPass },
            });
        } else {
            delete userData["password"];
            delete updatedFields["password"];

            await prisma.user.update({
                where: { id: userId },
                data: userData,
            });
        }

        await createLog({
            userId: session.user.id,
            action: "UPDATE",
            objectType: "USER",
            objectId: userId,
            info: {
                info: {
                    user: user.name + "(" + user.id + ")",
                    updatedBy: session.user.name + "(" + session.user.id + ")",
                    "Updated Fields": updatedFields,
                },
            },
        });

        return { success: true, message: "User updated!" };
    } catch (err) {
        console.log(err);
        return { success: false, message: "Error while updating user in DB" };
    }
};

export const getUsers = async () => {
    const session = await auth();

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPERVISOR")) {
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

export const searchUsers = async (query: string) => {
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

interface CreateUserInput {
    name: string;
    email: string;
    role: "USER" | "SUPERVISOR";
    password: string;
}

export const getUserCountByRole = async (role: RoleType) => {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    try {
        const userCount = await prisma.user.count({
            where: { role },
        });
        return { success: true, data: userCount };
    } catch (err) {
        return {
            success: false,
            message: "Error while fetching count from DB",
        };
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: fieldsWithoutPassword,
        });
        return user;
    } catch (err) {
        return null;
    }
};
