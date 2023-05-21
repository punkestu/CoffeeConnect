/*
  Warnings:

  - You are about to drop the column `satuan` on the `Bahan` table. All the data in the column will be lost.
  - Added the required column `satuanId` to the `Bahan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bahan" DROP COLUMN "satuan",
ADD COLUMN     "satuanId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Bahan" ADD CONSTRAINT "Bahan_satuanId_fkey" FOREIGN KEY ("satuanId") REFERENCES "Satuan"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
