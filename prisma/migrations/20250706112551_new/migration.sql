-- DropForeignKey
ALTER TABLE "Schedule_Event" DROP CONSTRAINT "Schedule_Event_levelId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule_Event" DROP CONSTRAINT "Schedule_Event_sectionId_fkey";

-- AddForeignKey
ALTER TABLE "Schedule_Event" ADD CONSTRAINT "Schedule_Event_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule_Event" ADD CONSTRAINT "Schedule_Event_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;
