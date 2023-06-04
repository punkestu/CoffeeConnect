/*
  Warnings:

  - The primary key for the `Ulasan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `Ulasan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ulasan" DROP CONSTRAINT "Ulasan_pkey",
DROP COLUMN "Id",
ADD CONSTRAINT "Ulasan_pkey" PRIMARY KEY ("userId", "produkId", "produkKedaiId");
