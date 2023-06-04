-- CreateTable
CREATE TABLE "Ulasan" (
    "Id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "produkId" INTEGER NOT NULL,
    "produkKedaiId" TEXT NOT NULL,

    CONSTRAINT "Ulasan_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Ulasan" ADD CONSTRAINT "Ulasan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ulasan" ADD CONSTRAINT "Ulasan_produkId_produkKedaiId_fkey" FOREIGN KEY ("produkId", "produkKedaiId") REFERENCES "Produk"("Id", "kedaiId") ON DELETE RESTRICT ON UPDATE CASCADE;
