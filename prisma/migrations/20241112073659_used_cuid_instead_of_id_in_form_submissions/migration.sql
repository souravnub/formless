/*
  Warnings:

  - The primary key for the `FormSubmission` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "FormSubmission" DROP CONSTRAINT "FormSubmission_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FormSubmission_id_seq";
