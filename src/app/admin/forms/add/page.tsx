"use client";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
import { useEffect, useState } from "react";

import { RoleType } from ".prisma/client";
import { createForm } from "@/actions/forms";
import AddCheckboxDialog from "@/components/domains/createForm/AddCheckboxDialog";
import AddDecisionCommentDialog from "@/components/domains/createForm/AddDecisionComment";
import AddDecisionFieldsDialog from "@/components/domains/createForm/AddDescisionDialog";
import AddRadioButtonsDialog from "@/components/domains/createForm/AddRadioButtonsDialog";
import AddTextInputDialog from "@/components/domains/createForm/AddTextInputDialog";
import "@/components/domains/createForm/form.css";
import { useJsonForm } from "@/hooks/use-json-form";
import { useToast } from "@/hooks/use-toast";
import Form from "@rjsf/core";
import { StrictRJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { generateData } from "@/ai";
import schema from "@/ai/generate-form-schema";
import { Skeleton } from "@/components/ui/skeleton";
import { imageUrlToBase64 } from "@/lib/utils";

const AddFormPage = () => {
    const { toast } = useToast();
    const params = useSearchParams();
    const prompt = params.get("prompt");
    const imageUrl = params.get("image");
    const imageType = params.get("imageType");

    const {
        propertiesArr,
        requiredFields,
        removeField,
        UISchema,
        addCheckboxes,
        addDecisionFields,
        addDecisionFieldsWithComment,
        addRadioButtons,
        addTextInput,
    } = useJsonForm();

    const [RJSFState, setRJSFState] = useState<StrictRJSFSchema>({ title: "", description: "" });

    const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
    const [isRadioDialogOpen, setIsRadioDialogOpen] = useState(false);
    const [isCheckboxDialogOpen, setIsCheckboxDialogOpen] = useState(false);
    const [isDecisionFieldDialogOpen, setIsDesicionFieldDialogOpen] = useState(false);
    const [isDecisionCommentDialogOpen, setIsDecisionCommentDialogOpen] = useState(false);

    const [formRole, setFormRole] = useState<RoleType>("SUPERVISOR");
    const [isGeneratingForm, setIsGeneratingForm] = useState(false);

    const handleSubmit = async () => {
        const formData = {
            title: RJSFState.title as string,
            description: RJSFState.description as string,
            requiredFields,
            properties: Object.assign({}, ...propertiesArr),
            uiSchema: UISchema,
            role: formRole,
        };

        if (!formData.title) {
            return toast({
                variant: "destructive",
                description: "Form title is required",
            });
        }
        if (!formData.description) {
            return toast({
                variant: "destructive",
                description: "Form description is required",
            });
        }

        if (propertiesArr.length === 0) {
            return toast({
                variant: "destructive",
                description: "There should be atleast 1 field in the form",
            });
        }

        const res = await createForm(formData);

        if (res && !res.success) {
            toast({
                description: res.message,
                variant: "destructive",
            });
        }
    };

    async function generateForm(prompt: string, schema: any) {
        setIsGeneratingForm(true);

        let res: any;
        if (imageUrl && imageType) {
            const dataURL = await imageUrlToBase64(imageUrl);
            if (dataURL) {
                res = await generateData(prompt, schema, [
                    { inlineData: { data: (dataURL as string).split(",")[1], mimeType: imageType } },
                ]);
                if (res.success) {
                    console.log(res.result.response.text());
                }
                console.log(res.success);
            }
        } else {
            res = await generateData(prompt, schema);
        }

        if (!res.success) {
            setIsGeneratingForm(false);
            return toast({ description: res.message, variant: "destructive" });
        }
        const data = JSON.parse(res.result.response.text());

        if (data.title) {
            setRJSFState((prev) => ({ ...prev, title: data.title }));
        }
        if (data.description) {
            setRJSFState((prev) => ({ ...prev, description: data.description }));
        }
        if (data.radioButtons && data.radioButtons.length > 0) {
            data.radioButtons.map((group: any) => {
                if (group) {
                    addRadioButtons({ title: group.title, radioButtons: group.elements });
                }
            });
        }
        if (data.checkboxes && data.checkboxes.length > 0) {
            data.checkboxes.map((group: any) => {
                if (group) {
                    addCheckboxes({ title: group.title, checkboxes: group.elements });
                }
            });
        }

        if (data.textInputs && data.textInputs.length > 0) {
            data.textInputs.map((inpGroup: any) => {
                if (inpGroup) {
                    const { title, defaultValue, isRequired, isMutableList } = inpGroup;
                    addTextInput({
                        title,
                        defaultVal: defaultValue ? defaultValue : "",
                        required: isRequired,
                        isMutableList,
                    });
                }
            });
        }

        if (data.decisionFields && data.decisionFields.length > 0) {
            data.decisionFields.map((descGroup: any) => {
                if (descGroup) {
                    const { title, withComments, elements } = descGroup;
                    if (withComments) {
                        addDecisionFieldsWithComment({ title, fields: elements });
                    } else {
                        addDecisionFields({ title, fields: elements });
                    }
                }
            });
        }

        setIsGeneratingForm(false);
    }

    useEffect(() => {
        if (prompt) {
            generateForm(prompt, schema);
        }
    }, [prompt]);

    return (
        <div className="container">
            <CustomBreadcrumb
                list={[
                    { name: "Dashboard", href: "/admin" },
                    { name: "Forms", href: "/admin/forms" },
                    { name: "New Form", href: "/forms/add" },
                ]}
            />

            {isGeneratingForm ? (
                <div className="grid grid-cols-2 h-[25rem] gap-2">
                    <div className="space-y-5">
                        <div className="flex gap-1 flex-col">
                            <Skeleton className="h-3 rounded-sm w-[100px]" />
                            <Skeleton className="h-9 w-[250px]" />
                        </div>
                        <div className="flex gap-1 flex-col">
                            <Skeleton className="h-3 rounded-sm w-[100px]" />
                            <Skeleton className="h-9 w-[250px]" />
                        </div>

                        <div className="flex gap-1 flex-col">
                            <Skeleton className="h-3 rounded-sm w-[100px]" />
                            <Skeleton className="w-[200px] h-9" />
                        </div>
                        <Skeleton className="w-full h-[13rem]" />
                    </div>
                    <Skeleton className="rounded-xl" />
                </div>
            ) : (
                <div className="grid grid-cols-2 bg-accent/30 p-5 rounded-md">
                    <form className="space-y-3 pr-5">
                        <h1 className="text-lg">Create a New Form</h1>
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={RJSFState.title}
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
                                value={RJSFState.description}
                                onChange={(e) =>
                                    setRJSFState((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div>
                            <Label htmlFor="desc">Role: </Label>
                            <select
                                id="role"
                                className="border p-2 rounded"
                                value={formRole}
                                onChange={(e) => setFormRole(e.target.value as RoleType)}
                            >
                                <option value="SUPERVISOR">Supervisor</option>
                                <option value="USER">User</option>
                            </select>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Fields</CardTitle>
                                <CardDescription>Create all the fields that are needed in this form</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    {propertiesArr.map((prop, idx) => {
                                        return (
                                            <div
                                                key={idx}
                                                className="flex justify-between bg-accent p-1 rounded-md items-center max-w-xs"
                                            >
                                                <span>
                                                    {prop &&
                                                        JSON.stringify(
                                                            (Object.values(prop)[0] as StrictRJSFSchema).title
                                                        )}
                                                </span>
                                                <Button
                                                    type="button"
                                                    variant={"destructive"}
                                                    className="p-2 px-3 h-auto"
                                                    onClick={() => {
                                                        removeField(idx);
                                                    }}
                                                >
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
                                        <DropdownMenuItem onClick={() => setIsInputDialogOpen(true)}>
                                            Text Input
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setIsRadioDialogOpen(true)}>
                                            Radio Buttons
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setIsCheckboxDialogOpen(true)}>
                                            Checkboxes
                                        </DropdownMenuItem>

                                        <DropdownMenuItem onClick={() => setIsDesicionFieldDialogOpen(true)}>
                                            Decision Fields
                                        </DropdownMenuItem>

                                        <DropdownMenuItem onClick={() => setIsDecisionCommentDialogOpen(true)}>
                                            Decision & Comment
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardContent>
                        </Card>
                    </form>

                    <div className="border-l pl-5">
                        <h2 className="text-lg ">Form Preview</h2>
                        <Form
                            className="form space-y-3"
                            uiSchema={UISchema}
                            onSubmit={(data) => {
                                console.log(data.formData);
                            }}
                            schema={{
                                title: RJSFState.title,
                                description: RJSFState.description,
                                required: requiredFields,
                                properties: Object.assign({}, ...propertiesArr), // to flatten array of obejcts into single object,
                            }}
                            validator={validator}
                        />
                        <Button className="mt-16" onClick={handleSubmit}>
                            Create Form
                        </Button>
                    </div>
                </div>
            )}
            <AddTextInputDialog
                isInputDialogOpen={isInputDialogOpen}
                setIsInputDialogOpen={setIsInputDialogOpen}
                onCreateTextInput={addTextInput}
            />

            <AddRadioButtonsDialog
                isDialogOpen={isRadioDialogOpen}
                setIsDialogOpen={setIsRadioDialogOpen}
                onSubmit={addRadioButtons}
            />

            <AddCheckboxDialog
                isDialogOpen={isCheckboxDialogOpen}
                setIsDialogOpen={setIsCheckboxDialogOpen}
                onSubmit={addCheckboxes}
            />

            <AddDecisionFieldsDialog
                isDialogOpen={isDecisionFieldDialogOpen}
                setIsDialogOpen={setIsDesicionFieldDialogOpen}
                onSubmit={addDecisionFields}
            />

            <AddDecisionCommentDialog
                isDialogOpen={isDecisionCommentDialogOpen}
                setIsDialogOpen={setIsDecisionCommentDialogOpen}
                onSubmit={addDecisionFieldsWithComment}
            />
        </div>
    );
};

export default AddFormPage;
