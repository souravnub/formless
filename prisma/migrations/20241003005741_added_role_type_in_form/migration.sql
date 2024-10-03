/*
  Warnings:

  - Added the required column `role` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "role" "RoleType" NOT NULL;
