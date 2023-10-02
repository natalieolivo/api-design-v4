/*
  Warnings:

  - A unique constraint covering the columns `[id,productId]` on the table `Update` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `UpdatePoints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UpdatePoints" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Update_id_productId_key" ON "Update"("id", "productId");
