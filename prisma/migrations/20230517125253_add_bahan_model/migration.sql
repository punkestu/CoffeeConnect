-- CreateTable
CREATE TABLE "Bahan" (
    "Id" SERIAL NOT NULL,
    "produkId" INTEGER NOT NULL,
    "produkKedaiId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "qty" DOUBLE PRECISION NOT NULL,
    "satuan" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "per" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Bahan_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Satuan" (
    "Id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Satuan_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Bahan" ADD CONSTRAINT "Bahan_produkId_produkKedaiId_fkey" FOREIGN KEY ("produkId", "produkKedaiId") REFERENCES "Produk"("Id", "kedaiId") ON DELETE RESTRICT ON UPDATE CASCADE;
