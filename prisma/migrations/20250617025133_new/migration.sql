/*
  Warnings:

  - You are about to drop the column `decution_pph` on the `Payroll` table. All the data in the column will be lost.
  - Added the required column `deduction_pph` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "decution_pph",
ADD COLUMN     "deduction_pph" INTEGER NOT NULL;
