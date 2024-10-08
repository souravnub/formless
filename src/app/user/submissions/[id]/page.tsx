// @ts-nocheck
import { Button } from "@/components/ui/button";
import prisma from "@/db";
import { auth } from "@/lib/auth";
import Link from "next/link";

const SingleSubmissionPage = async ({ params }: { params: { id: string } }) => {
    const session = await auth();
    const submission = await prisma.formSubmission.findUnique({
        where: { id: Number(params.id), userId: session?.user.id },
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
            Response:
            <ul className="grid gap-5 pl-4 pt-1">
                {Object.keys(submission.submissions as object).map((key) => {
                    return (
                        <li key={key}>
                            <span className="block text-muted-foreground">
                                {key}
                            </span>
                            <span>
                                {typeof submission.submissions[key] !== "string"
                                    ? Object.keys(
                                          submission.submissions[key]
                                      ).map((subKey) => (
                                          <div key={subKey}>
                                              <span>{subKey}</span>
                                              <span className="font-bold ml-2 ">
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
        </div>
    );
};

export default SingleSubmissionPage;
