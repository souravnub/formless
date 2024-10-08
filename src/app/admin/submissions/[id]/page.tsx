// @ts-nocheck
import { Button } from "@/components/ui/button";
import prisma from "@/db";
import Link from "next/link";

const SingleSubmissionPage = async ({ params }: { params: { id: string } }) => {
    const submission = await prisma.formSubmission.findUnique({
        where: { id: Number(params.id) },
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
                    <Link href={`/admin/forms/${submission.form.id}`}>
                        {submission.form.title}
                    </Link>
                </Button>
            </h1>
            <p>
                Submitted by:
                <Button asChild variant={"link"} className="text-blue-600 p-1">
                    <Link href={`/admin/users/${submission.userId}`}>
                        {submission.user.name}
                    </Link>
                </Button>
            </p>
            Response:
            <ul className="grid gap-3 pl-4 pt-1">
                {Object.keys(submission.submissions as object).map((key) => {
                    return (
                        <li
                            key={key}
                            className="grid items-center gap-4"
                            style={{ gridTemplateColumns: "8rem 1fr" }}>
                            <span className=" text-muted-foreground">
                                {key}
                            </span>
                            <span>
                                {typeof submission.submissions[key] !== "string"
                                    ? Object.keys(
                                          submission.submissions[key]
                                      ).map((subKey) => (
                                          <div className="grid grid-cols-2 max-w-xs">
                                              <span>{subKey}</span>
                                              <span>
                                                  {
                                                      submission.submissions[
                                                          key
                                                      ][subKey]
                                                  }
                                              </span>
                                          </div>
                                      ))
                                    : submission.submissions[key] || "---"}
                            </span>
                        </li>
                    );
                })}
            </ul>
            <Button asChild className="mt-5">
                <Link href={`/admin/submissions/${submission.id}/pdf`}>
                    View Pdf
                </Link>
            </Button>
        </div>
    );
};

export default SingleSubmissionPage;
