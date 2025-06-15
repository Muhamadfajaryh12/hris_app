-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "base_salary" INTEGER;

-- AlterTable
ALTER TABLE "Schedule_Event" ADD COLUMN     "date_end" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Salary" (
    "id" SERIAL NOT NULL,
    "basic_salary" INTEGER NOT NULL,
    "increase_salary" INTEGER,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "contract_type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "file_contract" TEXT,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" SERIAL NOT NULL,
    "pay_date" TIMESTAMP(3) NOT NULL,
    "period_moth" INTEGER,
    "period_year" INTEGER,
    "bonus" INTEGER,
    "bonus_overtime" INTEGER,
    "deduction_bpjs" INTEGER NOT NULL,
    "decution_pph" INTEGER NOT NULL,
    "deduction_attendence" INTEGER,
    "total_salary" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
