"use server";
import { auth } from "@/lib/auth";
import { GetSignedURLParams, GetSignedURLResult } from "./types";
import { generateUniqueFileName } from "@/lib/utils";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/awsUtils";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const ALLOWED_IMAGE_FILE_TYPES = ["image/jpeg", "image/png", "image/avif"];
const MAX_FILE_SIZE = 1048576 * 10; // 1048576bytes = 1mb, therefore, 1mb * 10 = 10mb

export async function generateSignedUrl({
    fileType,
    fileSize,
    checksum,
}: GetSignedURLParams): Promise<GetSignedURLResult> {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { success: false, message: "Not authorized" };
    }

    if (!ALLOWED_IMAGE_FILE_TYPES.includes(fileType)) {
        return {
            success: false,
            message: "invalid file type",
        };
    }
    if (fileSize > MAX_FILE_SIZE) {
        return {
            success: false,
            message: `file size larger than ${MAX_FILE_SIZE / 1048576} MB`,
        };
    }

    let fileKey = generateUniqueFileName();

    const command = new PutObjectCommand({
        ContentLength: fileSize,
        ContentType: fileType,
        ChecksumSHA256: checksum,
        Key: fileKey,
        Bucket: process.env.AWS_BUCKET_NAME,
    });

    try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        return { success: true, url };
    } catch (err) {
        return {
            success: false,
            message: "Error while generating signed url.",
        };
    }
}
