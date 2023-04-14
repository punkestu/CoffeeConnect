-- CreateTable
CREATE TABLE "Produk" (
    "Id" SERIAL NOT NULL,
    "kedaiId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Produk" ADD CONSTRAINT "Produk_kedaiId_fkey" FOREIGN KEY ("kedaiId") REFERENCES "Kedai_Profile"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
