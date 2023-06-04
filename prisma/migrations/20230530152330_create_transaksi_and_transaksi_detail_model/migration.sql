-- CreateTable
CREATE TABLE "Transaksi" (
    "Id" SERIAL NOT NULL,
    "kedai_ProfileId" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qty" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "TransaksiDetail" (
    "Id" SERIAL NOT NULL,
    "transaksiId" INTEGER NOT NULL,
    "produkId" INTEGER NOT NULL,
    "produkKedaiId" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "TransaksiDetail_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_kedai_ProfileId_fkey" FOREIGN KEY ("kedai_ProfileId") REFERENCES "Kedai_Profile"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaksiDetail" ADD CONSTRAINT "TransaksiDetail_transaksiId_fkey" FOREIGN KEY ("transaksiId") REFERENCES "Transaksi"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaksiDetail" ADD CONSTRAINT "TransaksiDetail_produkId_produkKedaiId_fkey" FOREIGN KEY ("produkId", "produkKedaiId") REFERENCES "Produk"("Id", "kedaiId") ON DELETE RESTRICT ON UPDATE CASCADE;
