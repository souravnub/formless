"use server"

import prisma from "@/db";

export const getSubmissions = async () => {

    const submissions = await prisma.formSubmission.findMany()
    return submissions;

};