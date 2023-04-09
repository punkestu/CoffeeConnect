-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "User_Profile" (
    "Id" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3),
    "address" TEXT,
    "phone" VARCHAR(15),

    CONSTRAINT "User_Profile_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Role" (
    "Id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Profile_Id_key" ON "User_Profile"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_name_key" ON "Role"("role_name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Profile" ADD CONSTRAINT "User_Profile_Id_fkey" FOREIGN KEY ("Id") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
