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
    onSubmit: (e: FormEvent) => void;
};

const AddRadioButtonsDialog = ({
    isDialogOpen,
    setIsDialogOpen,
    onSubmit,
}: DialogProps) => {
    const { toast } = useToast();
    const [input, setInput] = useState("");
    const [radioButtons, setRadioButtons] = useState<string[]>([]);

    function onAddRadioButton() {
        const inputVal = input.trim();

        if (inputVal.length === 0) {
            return toast({
                description: "Input is required!",
                variant: "destructive",
            });
        }
        if (radioButtons.find((btn) => btn === inputVal)) {
            return toast({
                description: "Value already exists!",
                variant: "destructive",
            });
        }
        setRadioButtons((prev) => [...prev, inputVal.trim()]);
        setInput("");
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create new Radio Button Group</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-5 my-4">
                        <div>
                            <Label htmlFor="textInputTitle">Title</Label>
                            <Input
                                name="title"
                                id="textInputTitle"
                                className="col-span-3"
                            />
                        </div>

                        <div>
                            <Label htmlFor="radioBtnInp">RadioButtons</Label>
                            <div className="space-y-1 my-2">
                                {radioButtons.length === 0 ? (
                                    <p className="text-sm text-red-500">
                                        No Radio Buttons Yet!
                                    </p>
                                ) : (
                                    radioButtons.map((btn, idx) => {
                                        return (
                                            <div className="bg-accent rounded-md p-2 text-sm flex items-center gap-5 w-fit">
                                                {btn}
                                                <button
                                                    onClick={() =>
                                                        setRadioButtons(
                                                            (prev) =>
                                                                prev.filter(
                                                                    (
                                                                        btn,
                                                                        index
                                                                    ) =>
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
                                    className="block h-auto p-1 px-3"
                                    variant={"outline"}
                                    onClick={onAddRadioButton}>
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

export default AddRadioButtonsDialog;
