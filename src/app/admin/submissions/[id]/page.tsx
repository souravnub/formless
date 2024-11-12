// @ts-nocheck
import RecursiveDisplay from "@/components/RecursiveDisplay";
import { Button } from "@/components/ui/button";
import prisma from "@/db";
import Link from "next/link";

const SingleSubmissionPage = async ({ params }: { params: { id: string } }) => {
    const submission = await prisma.formSubmission.findUnique({
        where: { id: params.id },
        include: {
            form: true,
            user: true,
        },
    });

    if (!submission) {
        return <p>No Submission Found</p>;
    }

    return (
        <div>
            <h1>
                Form:
                <Button asChild variant={"link"} className="text-blue-600 p-1">
                    <Link href={`/admin/forms/${submission.form.id}`}>{submission.form.title}</Link>
                </Button>
            </h1>
            <p>
                Submitted by:
                <Button asChild variant={"link"} className="text-blue-600 p-1">
                    <Link href={`/admin/users/${submission.userId}`}>{submission.user.name}</Link>
                </Button>
            </p>
            Response:
            <RecursiveDisplay data={submission.submissions} />
            <Button asChild className="mt-5">
                <Link href={`/admin/submissions/${submission.id}/pdf`}>View Pdf</Link>
            </Button>
        </div>
    );
};

export default SingleSubmissionPage;
