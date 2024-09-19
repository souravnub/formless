import React, { Dispatch, FormEvent, SetStateAction } from "react";
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

type DialogProps = {
    isInputDialogOpen: boolean;
    setIsInputDialogOpen: Dispatch<SetStateAction<boolean>>;
    onCreateTextInput: (e: FormEvent) => void;
};

const AddTextInputDialog = ({
    isInputDialogOpen,
    setIsInputDialogOpen,
    onCreateTextInput,
}: DialogProps) => {
    return (
        <Dialog open={isInputDialogOpen} onOpenChange={setIsInputDialogOpen}>
            <DialogContent>
                <form onSubmit={onCreateTextInput}>
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
                                name="defaultValue"
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
