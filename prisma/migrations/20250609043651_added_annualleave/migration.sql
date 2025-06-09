-- AlterTable
ALTER TABLE "Attendence" ADD COLUMN     "emotion" TEXT,
ADD COLUMN     "time_working" INTEGER;

-- CreateTable
CREATE TABLE "AnnualLeave" (
    "id" SERIAL NOT NULL,
    "date_leave" TIMESTAMP(3) NOT NULL,
    "approval_hrd" TEXT,
    "approval_leader" TEXT,
    "status" TEXT,
    "reason" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AnnualLeave_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnnualLeave" ADD CONSTRAINT "AnnualLeave_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
