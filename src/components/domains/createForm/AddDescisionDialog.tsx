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
import { useToast } from "@/hooks/use-toast";
import { PlusIcon, X } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type DialogProps = {
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    onSubmit: (data: { title: string; fields: string[] }) => void;
};

const AddDecisionFieldsDialog = ({
    isDialogOpen,
    setIsDialogOpen,
    onSubmit,
}: DialogProps) => {
    const { toast } = useToast();
    const [input, setInput] = useState("");
    const [title, setTitle] = useState("");
    const [fields, setFields] = useState<string[]>([]);

    function onAddField() {
        const inputVal = input.trim();

        if (inputVal.length === 0) {
            return toast({
                description: "Input is required!",
                variant: "destructive",
            });
        }
        if (fields.find((btn) => btn === inputVal)) {
            return toast({
                description: "Value already exists!",
                variant: "destructive",
            });
        }
        setFields((prev) => [...prev, inputVal.trim()]);
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
        if (fields.length === 0) {
            return toast({
                description: "Their should be atleast 1 field",
                variant: "destructive",
            });
        }
        setIsDialogOpen(false);
        setFields([]);
        setTitle("");
        onSubmit({ title, fields });
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create new Decision Group</DialogTitle>
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
                            <Label htmlFor="radioBtnInp">Decision Fields</Label>
                            <div className="space-y-1 my-2">
                                {fields.length === 0 ? (
                                    <p className="text-sm text-red-500">
                                        No Fields Yet!
                                    </p>
                                ) : (
                                    fields.map((field, idx) => {
                                        return (
                                            <div
                                                key={field}
                                                className="bg-accent rounded-md p-2 text-sm flex items-center gap-5 w-fit">
                                                {field}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setFields((prev) =>
                                                            prev.filter(
                                                                (_, index) =>
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
                                    id="radioBtnInp"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />

                                <Button
                                    type="button"
                                    className="block h-auto p-1 px-3"
                                    variant={"outline"}
                                    onClick={onAddField}>
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

export default AddDecisionFieldsDialog;
