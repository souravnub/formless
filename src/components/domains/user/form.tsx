"use client";
import Form from "@rjsf/core";
import React from "react";
import validator from "@rjsf/validator-ajv8";
import "./form.css";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserForm = ({ form }: { form: any }) => {
    return (
        <Card className="max-w-xl mx-auto mt-5">
            <CardHeader>
                <CardTitle>{form.title}</CardTitle>
                <CardDescription>{form.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    onSubmit={() => console.log("submit")}
                    className="form space-y-3"
                    uiSchema={form.uiSchema}
                    schema={form.schema}
                    validator={validator}>
                    <Button>Submit</Button>
                </Form>
            </CardContent>
        </Card>
    );
};

export default UserForm;
