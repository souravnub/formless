"use client";
import React, {
    Dispatch,
    FormEvent,
    SetStateAction,
    useRef,
    useState,
} from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type DialogProps = {
    isInputDialogOpen: boolean;
    setIsInputDialogOpen: Dispatch<SetStateAction<boolean>>;
    onCreateTextInput: (data: {
        title: string;
        defaultVal: string;
        required: boolean;
    }) => void;
};

const AddTextInputDialog = ({
    isInputDialogOpen,
    setIsInputDialogOpen,
    onCreateTextInput,
}: DialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const { title, defaultVal, required } = Object.fromEntries(formData);

        if (!title) {
            return toast({
                variant: "destructive",
                description: "Title for the field is requierd",
            });
        }

        onCreateTextInput({
            title: title as string,
            defaultVal: defaultVal as string,
            required: required ? true : false,
        });

        formRef.current?.reset();
        setIsInputDialogOpen(false);
    }
    return (
        <Dialog open={isInputDialogOpen} onOpenChange={setIsInputDialogOpen}>
            <DialogContent>
                <form onSubmit={handleSubmit} ref={formRef}>
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
                            <Label htmlFor="defaultVal">Default value</Label>
                            <Input
                                name="defaultVal"
                                id="defaultVal"
                                className="col-span-3"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label htmlFor="required">Required</Label>
                            <Checkbox name="required" id="required" />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button>Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTextInputDialog;
