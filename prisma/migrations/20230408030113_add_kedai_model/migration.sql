-- CreateTable
CREATE TABLE "Kedai_Profile" (
    "Id" TEXT NOT NULL,
    "picture" TEXT,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(15) NOT NULL,

    CONSTRAINT "Kedai_Profile_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kedai_Profile_Id_key" ON "Kedai_Profile"("Id");

-- AddForeignKey
ALTER TABLE "Kedai_Profile" ADD CONSTRAINT "Kedai_Profile_Id_fkey" FOREIGN KEY ("Id") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
