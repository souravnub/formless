import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import cryptoUtil from "crypto";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function hashPass(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
}
export const generateUniqueFileName = (bytes = 32) => cryptoUtil.randomBytes(bytes).toString("hex");

export const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
};
