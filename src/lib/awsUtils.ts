import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_IAM_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_IAM_SECRET_KEY!,
    },
});
