import RecursiveDisplay from "@/components/RecursiveDisplay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import prisma from "@/db";
import Link from "next/link";

const SingleLogPage = async ({ params }: { params: { id: string } }) => {
    const log = await prisma.log.findUnique({
        where: { id: params.id },
        include: {
            user: true,
        },
    });

    if (!log) {
        return <p>No log Found</p>;
    }

    return (
        <div className="container mx-auto my-5 p-4">
            <Card className="p-6">
                <h1 className="text-2xl font-semibold mb-4">
                    Log Details
                </h1>
                <p className="mb-2">
                    <strong>Action:</strong> {log.action} {log.objectType}
                </p>
                <p className="mb-4">
                    <strong>Action done by:</strong>
                    <Button asChild variant={"link"} className="text-blue-600 p-1">
                        <Link href={`/admin/users/${log.userId}`}>
                            {log.user.name}
                        </Link>
                    </Button>
                </p>
                <h2 className="text-lg font-medium mb-2">Details:</h2>
                <RecursiveDisplay data={log.info} />
                <div className="mt-4">
                    <Button asChild variant="outline">
                        <Link href={`/admin/logs/`}>
                            Back
                        </Link>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default SingleLogPage;
