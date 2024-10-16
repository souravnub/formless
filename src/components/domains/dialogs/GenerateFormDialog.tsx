"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ReactNode, useState } from "react";

const GenerateFormDialog = ({ children }: { children: ReactNode }) => {
    const [prompt, setPrompt] = useState("");
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Form using AI</DialogTitle>
                    <DialogDescription>
                        Please provide the details for the form to be generated.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Label htmlFor="form_description">Prompt</Label>
                    <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={5}
                        className="m-h-40"
                        id="form_description"></Textarea>
                </div>
                <DialogFooter>
                    <Button type="submit" asChild>
                        <Link href={`/admin/forms/generate?propmt=${prompt}`}>
                            Generate
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GenerateFormDialog;
