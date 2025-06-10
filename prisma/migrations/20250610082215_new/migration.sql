-- CreateTable
CREATE TABLE "Overtime" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "approval_leader" TEXT,
    "shift" TEXT NOT NULL,
    "compensation" TEXT NOT NULL,
    "overtime_duration" INTEGER NOT NULL,
    "break_duration" INTEGER,
    "work_note" TEXT NOT NULL,
    "file" TEXT,
    "status_paid" TEXT,

    CONSTRAINT "Overtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule_Event" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hours_start" TEXT,
    "hours_end" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "sectionId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,

    CONSTRAINT "Schedule_Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "work_time" TEXT NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule_Event" ADD CONSTRAINT "Schedule_Event_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule_Event" ADD CONSTRAINT "Schedule_Event_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
