import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function hashPass(password: string) {
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
}