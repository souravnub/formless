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

import { useToast } from "@/hooks/use-toast";
import Form from "@rjsf/semantic-ui";
import { StrictRJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import "./formPreview.css";
import AddTextInputDialog from "@/components/domains/createForm/AddTextInputDialog";
import { useJsonForm } from "@/hooks/use-json-form";
import { createForm } from "@/actions/forms";

const AddFormPage = () => {
    const { toast } = useToast();
    const { propertiesArr, addField, requiredFields, removeField } =
        useJsonForm();

    const [RJSFState, setRJSFState] = useState<StrictRJSFSchema>({});

    const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);

    function onCreateTextInput(e: FormEvent) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const inputData = Object.fromEntries(formData);

        if (!inputData.title) {
            return toast({
                variant: "destructive",
                description: "Title for the field is requierd",
            });
        }

        setIsInputDialogOpen(false);

        const isRequired = inputData.required ? true : false;
        addField({ ...inputData, type: "string" }, isRequired);
    }

    const handleSubmit = async () => {
        const formData = {
            title: RJSFState.title,
            description: RJSFState.description,
            properties: propertiesArr.map((prop) => {
                return {
                    title: prop ? Object.keys(prop)[0] : "",
                    type: prop
                        ? (Object.values(prop)[0] as StrictRJSFSchema).type
                        : "",
                    default: prop
                        ? (Object.values(prop)[0] as StrictRJSFSchema).default
                        : "",
                };
            }),
        };

        const res = await createForm(formData);
        console.log(res);
    };

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
                                setRJSFState((prev) => ({
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
                                setRJSFState((prev) => ({
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
                                                    removeField(idx)
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
                                    <DropdownMenuItem>
                                        Selectbox
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardContent>
                    </Card>
                </form>

                <div className="border-l pl-5">
                    <h2 className="text-lg ">Form Preview</h2>
                    <Form
                        className="preview-form space-y-3"
                        schema={{
                            title: RJSFState.title,
                            description: RJSFState.description,

                            properties: Object.assign({}, ...propertiesArr), // to flatten array of obejcts into single object,
                        }}
                        validator={validator}
                    />
                    <Button className="mt-16" onClick={handleSubmit}>
                        Create Form
                    </Button>
                </div>
            </div>

            <AddTextInputDialog
                isInputDialogOpen={isInputDialogOpen}
                setIsInputDialogOpen={setIsInputDialogOpen}
                onCreateTextInput={onCreateTextInput}
            />
        </div>
    );
};

export default AddFormPage;
