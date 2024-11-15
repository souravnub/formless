-- AlterTable
ALTER TABLE "UserNotification" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isArchived" SET DEFAULT false;
