-- CreateEnum
CREATE TYPE "Action" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'SUBMIT', 'APPROVE', 'DENY');

-- CreateEnum
CREATE TYPE "ObjectType" AS ENUM ('FORM', 'FORM_SUBMISSION', 'USER', 'USER_REQUEST');

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "info" JSONB NOT NULL,
    "action" "Action" NOT NULL,
    "objectType" "ObjectType" NOT NULL,
    "objectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
