/*
  Warnings:

  - Added the required column `userId` to the `Overtime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Overtime" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Overtime" ADD CONSTRAINT "Overtime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
