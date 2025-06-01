-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "section" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_section_key" ON "Section"("section");
