"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SignupForm from "@/components/domains/auth/SignupForm";


export default async function SignUpPage() {
    return (
        <div className="container max-w-2xl pt-20">
            <Card>
                <CardHeader className="space-y-2">
                    <CardTitle>Create a User Request to Formless</CardTitle>
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
                    <SignupForm/>
                </CardContent>
            </Card>
        </div>
    );
}