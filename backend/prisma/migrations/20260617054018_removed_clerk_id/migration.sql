/*
  Warnings:

  - You are about to drop the column `clerkId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_clerkId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "clerkId";

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
