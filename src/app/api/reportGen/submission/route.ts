import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const submissionIds = searchParams.get("submissions")?.split(",");

    const submission = await prisma.formSubmission.findMany({
        where: { id: { in: submissionIds } },
        select: {
            submissions: true,
        },
    });

    return NextResponse.json({ submission });
}
