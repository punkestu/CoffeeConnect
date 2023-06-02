/*
  Warnings:

  - You are about to drop the column `qty` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `TransaksiDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaksi" DROP COLUMN "qty",
DROP COLUMN "total";

-- AlterTable
ALTER TABLE "TransaksiDetail" DROP COLUMN "total";
