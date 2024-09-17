"use client";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { FormEvent, useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import Form from "@rjsf/semantic-ui";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";

const AddFormPage = () => {
    const [fieldsState, setFieldsState] = useState<RJSFSchema>({
        properties: {},
    });
    const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);

    function handleCreateInputText(e: FormEvent) {
        e.preventDefault();
        setIsInputDialogOpen(false);

        const formData = new FormData(e.target as HTMLFormElement);
        const inputData = Object.fromEntries(formData);

        setFieldsState((prev) => {
            const newState: RJSFSchema = {
                ...prev,
                properties: {
                    ...prev.properties,
                },
            };
            if (newState.properties) {
                newState.properties[inputData.title as string] = {
                    default: (inputData.defaultValue as string) || "",
                    type: "string",
                };
                console.log("newState", newState);
                return { ...newState };
            }
        });
    }

    useEffect(() => {
        console.log(fieldsState);
    }, [fieldsState]);

    return (
        <div className="container">
            <CustomBreadcrumb
                list={[
                    { name: "Dashboard", href: "/admin" },
                    { name: "Forms", href: "/admin/forms" },
                    { name: "New Form", href: "/forms/add" },
                ]}
            />

            <div className="grid grid-cols-2 bg-accent/30 p-5 rounded-md">
                <form className="space-y-3 pr-5">
                    <h1 className="text-lg">Create a New Form</h1>
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            onChange={(e) =>
                                setFieldsState((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Label htmlFor="desc">Description</Label>
                        <Textarea
                            id="desc"
                            onChange={(e) =>
                                setFieldsState((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Fields</CardTitle>
                            <CardDescription>
                                Create all the fields that are needed in this
                                form
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {fieldsState.properties &&
                                Object.keys(fieldsState.properties).map(
                                    (prop) => {
                                        return (
                                            <span>{JSON.stringify(prop)}</span>
                                        );
                                    }
                                )}

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="px-8">
                                        <PlusIcon />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="center">
                                    <DropdownMenuItem
                                        onClick={() =>
                                            setIsInputDialogOpen(true)
                                        }>
                                        Text Input
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Checkbox
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Radio</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardContent>
                    </Card>
                </form>

                <div className="border-l pl-5">
                    <h2 className="text-lg ">Form Preview</h2>
                    <Form schema={fieldsState} validator={validator} />
                </div>
            </div>

            <Dialog
                open={isInputDialogOpen}
                onOpenChange={setIsInputDialogOpen}>
                <DialogContent>
                    <form onSubmit={handleCreateInputText}>
                        <DialogHeader>
                            <DialogTitle>Create a new text input</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="textInputTitle">Title</Label>
                                <Input
                                    name="title"
                                    id="textInputTitle"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="defaultVal">
                                    Default value
                                </Label>
                                <Input
                                    name="defaultValue"
                                    id="defaultVal"
                                    className="col-span-3"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button>Create</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddFormPage;
