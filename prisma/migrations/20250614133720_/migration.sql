/*
  Warnings:

  - You are about to drop the column `Category` on the `Schedule_Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule_Event" DROP COLUMN "Category",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Meeting';
