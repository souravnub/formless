"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddCheckboxesProps } from "@/hooks/types";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon, X } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type DialogProps = {
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    onSubmit: (data: AddCheckboxesProps) => void;
};

const AddCheckboxDialog = ({
    isDialogOpen,
    setIsDialogOpen,
    onSubmit,
}: DialogProps) => {
    const { toast } = useToast();
    const [input, setInput] = useState("");
    const [title, setTitle] = useState("");
    const [checkboxes, setCheckboxes] = useState<string[]>([]);

    function onAddCheckbox() {
        const inputVal = input.trim();

        if (inputVal.length === 0) {
            return toast({
                description: "Input is required!",
                variant: "destructive",
            });
        }
        if (checkboxes.find((btn) => btn === inputVal)) {
            return toast({
                description: "Value already exists!",
                variant: "destructive",
            });
        }
        setCheckboxes((prev) => [...prev, inputVal.trim()]);
        setInput("");
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (title.trim().length == 0) {
            return toast({
                description: "title is required",
                variant: "destructive",
            });
        }
        if (checkboxes.length === 0) {
            return toast({
                description: "Their should be atleast 1 checkbox option",
                variant: "destructive",
            });
        }
        setIsDialogOpen(false);
        setCheckboxes([]);
        setTitle("");
        onSubmit({ title, checkboxes });
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create new Checkbox Group</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-5 my-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                id="title"
                                className="col-span-3"
                            />
                        </div>

                        <div>
                            <Label htmlFor="checkboxBtnInp">Checkboxes</Label>
                            <div className="space-y-1 my-2">
                                {checkboxes.length === 0 ? (
                                    <p className="text-sm text-red-500">
                                        No Checkboxes Yet!
                                    </p>
                                ) : (
                                    checkboxes.map((btn, idx) => {
                                        return (
                                            <div
                                                key={btn}
                                                className="bg-accent rounded-md p-2 text-sm flex items-center gap-5 w-fit">
                                                {btn}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setCheckboxes((prev) =>
                                                            prev.filter(
                                                                (btn, index) =>
                                                                    index !==
                                                                    idx
                                                            )
                                                        )
                                                    }
                                                    className="text-red-400 bg-neutral-200 p-0.5 rounded-sm">
                                                    <X className="size-4" />
                                                </button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            <div className="flex gap-2 mt-2">
                                <Input
                                    id="checkboxBtnInp"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />

                                <Button
                                    type="button"
                                    className="block h-auto p-1 px-3"
                                    variant={"outline"}
                                    onClick={onAddCheckbox}>
                                    <PlusIcon />
                                </Button>
                            </div>
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

export default AddCheckboxDialog;
