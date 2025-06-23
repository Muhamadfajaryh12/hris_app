/*
  Warnings:

  - Added the required column `training_category` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "training_category" TEXT NOT NULL;
