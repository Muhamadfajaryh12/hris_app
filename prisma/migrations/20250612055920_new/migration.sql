/*
  Warnings:

  - You are about to drop the column `date_leave` on the `AnnualLeave` table. All the data in the column will be lost.
  - Added the required column `data_count` to the `AnnualLeave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_end` to the `AnnualLeave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_start` to the `AnnualLeave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hrdId` to the `AnnualLeave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leaderId` to the `AnnualLeave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `AnnualLeave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leaderId` to the `Overtime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnnualLeave" DROP COLUMN "date_leave",
ADD COLUMN     "data_count" INTEGER NOT NULL,
ADD COLUMN     "date_end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "date_start" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hrdId" INTEGER NOT NULL,
ADD COLUMN     "leaderId" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Overtime" ADD COLUMN     "leaderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "positionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Position_position_key" ON "Position"("position");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnualLeave" ADD CONSTRAINT "AnnualLeave_hrdId_fkey" FOREIGN KEY ("hrdId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnualLeave" ADD CONSTRAINT "AnnualLeave_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overtime" ADD CONSTRAINT "Overtime_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
