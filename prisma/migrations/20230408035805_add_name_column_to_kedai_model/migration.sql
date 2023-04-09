/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Kedai_Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Kedai_Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kedai_Profile" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Kedai_Profile_name_key" ON "Kedai_Profile"("name");
