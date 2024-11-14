import { renderToStream } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import prisma from "@/db";
import { MultipleSubmissionsPdf } from "./MultipleSubmissionsPdf";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const submissionIds = searchParams.get("submissions")?.split(",");

    const submissions = await prisma.formSubmission.findMany({
        where: { id: { in: submissionIds } },
        include: { user: true, form: true },
    });

    const stream = await renderToStream(<MultipleSubmissionsPdf submissions={submissions} />);
    return new NextResponse(stream as unknown as ReadableStream);
}
