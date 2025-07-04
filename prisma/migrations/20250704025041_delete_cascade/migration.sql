-- DropForeignKey
ALTER TABLE "AnnualLeave" DROP CONSTRAINT "AnnualLeave_hrdId_fkey";

-- DropForeignKey
ALTER TABLE "AnnualLeave" DROP CONSTRAINT "AnnualLeave_leaderId_fkey";

-- DropForeignKey
ALTER TABLE "AnnualLeave" DROP CONSTRAINT "AnnualLeave_userId_fkey";

-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Overtime" DROP CONSTRAINT "Overtime_leaderId_fkey";

-- DropForeignKey
ALTER TABLE "Overtime" DROP CONSTRAINT "Overtime_shiftId_fkey";

-- DropForeignKey
ALTER TABLE "Overtime" DROP CONSTRAINT "Overtime_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_userId_fkey";

-- AddForeignKey
ALTER TABLE "AnnualLeave" ADD CONSTRAINT "AnnualLeave_hrdId_fkey" FOREIGN KEY ("hrdId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnualLeave" ADD CONSTRAINT "AnnualLeave_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnualLeave" ADD CONSTRAINT "AnnualLeave_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overtime" ADD CONSTRAINT "Overtime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overtime" ADD CONSTRAINT "Overtime_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overtime" ADD CONSTRAINT "Overtime_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
