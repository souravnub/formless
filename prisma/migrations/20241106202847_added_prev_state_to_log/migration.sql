/*
  Warnings:

  - Added the required column `prevState` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "prevState" JSONB NOT NULL;
