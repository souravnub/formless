import { renderToStream } from "@react-pdf/renderer";
import { SubmissionPdf } from "./SubmissionPdf";
import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const submission = await prisma.formSubmission.findUnique({
        where: { id: Number(params.id) },
        include: {
            form: true,
            user: true,
        },
    });
    if (!submission) {
        return Response.json({
            message: "No submission found",
        });
    }

    const stream = await renderToStream(
        <SubmissionPdf
            form={submission.form}
            submission={submission.submissions as any}
            user={submission.user}
            submissionId={submission.id.toString()}
        />
    );
    return new NextResponse(stream as unknown as ReadableStream);
}
