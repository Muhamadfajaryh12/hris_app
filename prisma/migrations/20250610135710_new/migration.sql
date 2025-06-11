/*
  Warnings:

  - You are about to drop the column `shift` on the `Overtime` table. All the data in the column will be lost.
  - Added the required column `shiftId` to the `Overtime` table without a default value. This is not possible if the table is not empty.
  - Made the column `break_duration` on table `Overtime` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Overtime" DROP COLUMN "shift",
ADD COLUMN     "shiftId" INTEGER NOT NULL,
ALTER COLUMN "break_duration" SET NOT NULL,
ALTER COLUMN "break_duration" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Overtime" ADD CONSTRAINT "Overtime_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
