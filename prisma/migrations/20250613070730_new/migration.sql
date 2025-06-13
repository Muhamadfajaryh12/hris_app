-- DropForeignKey
ALTER TABLE "AnnualLeave" DROP CONSTRAINT "AnnualLeave_hrdId_fkey";

-- DropForeignKey
ALTER TABLE "AnnualLeave" DROP CONSTRAINT "AnnualLeave_leaderId_fkey";

-- DropForeignKey
ALTER TABLE "Overtime" DROP CONSTRAINT "Overtime_leaderId_fkey";

-- AlterTable
ALTER TABLE "AnnualLeave" ALTER COLUMN "hrdId" DROP NOT NULL,
ALTER COLUMN "leaderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Overtime" ALTER COLUMN "leaderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AnnualLeave" ADD CONSTRAINT "AnnualLeave_hrdId_fkey" FOREIGN KEY ("hrdId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnualLeave" ADD CONSTRAINT "AnnualLeave_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overtime" ADD CONSTRAINT "Overtime_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
