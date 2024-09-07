import LoginForm from "@/components/domains/auth/LoginForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function LoginPage() {
    return (
        <div className="container max-w-2xl pt-20">
            <Card>
                <CardHeader className="space-y-2">
                    <CardTitle>Login to Formless</CardTitle>
                    <CardDescription>
                        This is the official Form management console for KBM.
                        <Link
                            href="https://kbmcommercial.com/"
                            className="underline hover:text-primary">
                            https://kbmcommercial.com/
                        </Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
}
