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
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";

import Form from "@rjsf/semantic-ui";
import { StrictRJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";

const AddFormPage = () => {
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");

    const [propertiesArr, setPropertiesArr] = useState<
        StrictRJSFSchema["properties"][]
    >([]);
    const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);

    function handleCreateInputText(e: FormEvent) {
        e.preventDefault();
        setIsInputDialogOpen(false);

        const formData = new FormData(e.target as HTMLFormElement);

        const inputData = Object.fromEntries(formData);
        const data: StrictRJSFSchema["properties"] = {};
        data[inputData.title as string] = {
            type: "string",
            title: inputData.title as string,
            default: inputData.defaultValue as string,
        };

        setPropertiesArr((prev) => [...prev, data]);
    }

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
                            onChange={(e) => setFormTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="desc">Description</Label>
                        <Textarea
                            id="desc"
                            onChange={(e) => setFormDescription(e.target.value)}
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
                            <div className="flex flex-col gap-2">
                                {propertiesArr.map((prop, idx) => {
                                    return (
                                        <div className="flex justify-between bg-accent p-1 rounded-md items-center max-w-xs">
                                            <span>
                                                {prop &&
                                                    JSON.stringify(
                                                        (
                                                            Object.values(
                                                                prop
                                                            )[0] as StrictRJSFSchema
                                                        ).title
                                                    )}
                                            </span>
                                            <Button
                                                type="button"
                                                variant={"destructive"}
                                                className="p-2 px-3 h-auto"
                                                onClick={() =>
                                                    setPropertiesArr((prev) =>
                                                        prev.filter(
                                                            (
                                                                currProp,
                                                                currIdx
                                                            ) => currIdx !== idx
                                                        )
                                                    )
                                                }>
                                                <TrashIcon />
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="px-8 mt-4">
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
                    <Form
                        schema={{
                            title: formTitle,
                            description: formDescription,

                            properties: Object.assign({}, ...propertiesArr), // to flatten array of obejcts into single object,
                        }}
                        validator={validator}
                    />
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
