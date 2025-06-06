-- CreateTable
CREATE TABLE "Attendence" (
    "id" SERIAL NOT NULL,
    "time_in" TIMESTAMP(3) NOT NULL,
    "time_out" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Attendence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendence" ADD CONSTRAINT "Attendence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
