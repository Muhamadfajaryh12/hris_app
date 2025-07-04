-- DropForeignKey
ALTER TABLE "Salary" DROP CONSTRAINT "Salary_employeeId_fkey";

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
