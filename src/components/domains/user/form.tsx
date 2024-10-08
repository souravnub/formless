"use client";
import Form, { IChangeEvent } from "@rjsf/core";
import React, { useState } from "react";
import validator from "@rjsf/validator-ajv8";
import "../createForm/form.css";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { submitForm } from "@/actions/forms";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const UserForm = ({ form }: { form: any }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleFormSubmit(formState: IChangeEvent) {
        setIsSubmitting(true);
        const res = await submitForm(form.id, formState.formData);

        setIsSubmitting(false);

        toast({
            description: res.message,
            variant: res.success ? "default" : "destructive",
        });

        if (res.success) {
            router.push("/user");
        }
    }

    return (
        <Card className="max-w-xl mx-auto mt-5">
            <CardHeader>
                <CardTitle>{form.title}</CardTitle>
                <CardDescription>{form.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    onSubmit={handleFormSubmit}
                    className="form space-y-3"
                    uiSchema={form.uiSchema}
                    schema={form.schema}
                    validator={validator}>
                    <Button disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </Form>
            </CardContent>
        </Card>
    );
};

export default UserForm;
