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

interface CreateUserInput {
    name: string;
    email: string;
    role: "USER" | "SUPERVISOR";
    password: string;
}
