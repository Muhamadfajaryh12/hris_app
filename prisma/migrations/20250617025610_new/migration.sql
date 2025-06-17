/*
  Warnings:

  - You are about to drop the column `period_moth` on the `Payroll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "period_moth",
ADD COLUMN     "period_month" INTEGER;
