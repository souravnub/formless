// @ts-nocheck
import RecursiveDisplay from "@/components/RecursiveDisplay";
import { Button } from "@/components/ui/button";
import prisma from "@/db";
import { auth } from "@/lib/auth";
import Link from "next/link";

const SingleSubmissionPage = async ({ params }: { params: { id: string } }) => {
    const session = await auth();
    const submission = await prisma.formSubmission.findUnique({
        where: { id: params.id, userId: session?.user.id },
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
            Response:
            <RecursiveDisplay data={submission.submissions} />
        </div>
    );
};

export default SingleSubmissionPage;
