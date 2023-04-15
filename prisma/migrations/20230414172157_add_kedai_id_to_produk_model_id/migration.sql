/*
  Warnings:

  - The primary key for the `Produk` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Produk" DROP CONSTRAINT "Produk_pkey",
ADD CONSTRAINT "Produk_pkey" PRIMARY KEY ("Id", "kedaiId");
