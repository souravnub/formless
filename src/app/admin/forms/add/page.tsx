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
import { useState } from "react";

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

const AddFormPage = () => {
    const { toast } = useToast();
    const params = useSearchParams();
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

    const [RJSFState, setRJSFState] = useState<StrictRJSFSchema>({});

    const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
    const [isRadioDialogOpen, setIsRadioDialogOpen] = useState(false);
    const [isCheckboxDialogOpen, setIsCheckboxDialogOpen] = useState(false);
    const [isDecisionFieldDialogOpen, setIsDesicionFieldDialogOpen] =
        useState(false);
    const [isDecisionCommentDialogOpen, setIsDecisionCommentDialogOpen] =
        useState(false);

    const [formRole, setFormRole] = useState<RoleType>("SUPERVISOR");

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

                    <div>
                        <Label htmlFor="desc">Role: </Label>
                        <select
                            id="role"
                            className="border p-2 rounded"
                            onChange={(e) =>
                                setFormRole(e.target.value as RoleType)
                            }>
                            <option value="SUPERVISOR">Supervisor</option>
                            <option value="USER">User</option>
                        </select>
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
                                        <div
                                            key={idx}
                                            className="flex justify-between bg-accent p-1 rounded-md items-center max-w-xs">
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
                                                onClick={() => {
                                                    removeField(idx);
                                                }}>
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
                                    <DropdownMenuItem
                                        onClick={() =>
                                            setIsRadioDialogOpen(true)
                                        }>
                                        Radio Buttons
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            setIsCheckboxDialogOpen(true)
                                        }>
                                        Checkboxes
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        onClick={() =>
                                            setIsDesicionFieldDialogOpen(true)
                                        }>
                                        Decision Fields
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        onClick={() =>
                                            setIsDecisionCommentDialogOpen(true)
                                        }>
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
