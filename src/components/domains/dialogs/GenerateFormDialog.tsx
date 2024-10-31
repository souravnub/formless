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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateSignedUrl } from "@/actions/aws";
import { computeSHA256 } from "@/lib/utils";
import { useRouter } from "next/navigation";

const GenerateFormDialog = ({ children }: { children: ReactNode }) => {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState<undefined | string>(undefined);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageFilePath, setImageFilePath] = useState("");
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setImageFilePath(e.target.value);
            const reader = new FileReader();
            reader.onload = (readEvent) => {
                if (readEvent.target) {
                    setImage(readEvent.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            // if no image is selected
            clearImage();
        }
    }

    function clearImage() {
        setImage(undefined);
        setImageFilePath("");
        setSelectedFile(null);
    }

    async function handleGenerate() {
        if (image && selectedFile) {
            setIsUploadingImage(true);
            const checksum = await computeSHA256(selectedFile);
            const fileUploadRes = await generateSignedUrl({
                fileSize: selectedFile.size,
                fileType: selectedFile.type,
                checksum,
            });
            if (!fileUploadRes.success) {
                toast({ description: fileUploadRes.message, variant: "destructive" });
                return;
            }

            await fetch(fileUploadRes.url, {
                method: "PUT",
                headers: { "Content-Type": selectedFile.type },
                body: selectedFile,
            });

            setIsUploadingImage(false);

            const imageURL = fileUploadRes.url.split("?")[0];
            router.push(`/admin/forms/add?prompt=${prompt}&image=${imageURL}&imageType=${selectedFile.type}`);
            return;
        }
        router.push(`/admin/forms/add?prompt=${prompt}`);
    }

    return (
        <Dialog
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    clearImage();
                }
            }}
        >
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Form using AI</DialogTitle>
                    <DialogDescription>Please provide the details for the form to be generated.</DialogDescription>
                </DialogHeader>

                {image && (
                    <div className="max-w-xs  p-2  relative group">
                        <img className="rounded-lg" src={image} />
                        <button
                            className=" absolute -top-0.5 -right-0.5 bg-primary/40 border text-white  opacity-0 rounded-full p-0.5 group-hover:opacity-100 group-focus-within:opacity-100 transition-all hover:bg-primary/60"
                            onClick={clearImage}
                        >
                            <X className="size-5" />
                        </button>
                    </div>
                )}
                <div>
                    <Label htmlFor="image">Form Image</Label>
                    <Input type="file" onChange={handleImageChange} value={imageFilePath} />
                </div>

                <div>
                    <Label htmlFor="form_description">Prompt</Label>
                    <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={5}
                        className="m-h-40"
                        id="form_description"
                    ></Textarea>
                </div>
                <DialogFooter>
                    <Button onClick={handleGenerate} disabled={prompt.trim().length === 0 || isUploadingImage}>
                        {!isUploadingImage ? "Generate" : "Uploading Image..."}
                    </Button>
                    {/* <Link href={{ pathname: "/admin/forms/add", query: { image, prompt } }}>Generate</Link> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GenerateFormDialog;
