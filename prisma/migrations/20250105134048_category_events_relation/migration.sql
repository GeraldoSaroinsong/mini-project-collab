/*
  Warnings:

  - You are about to drop the `CategoriesOnEvents` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_category` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnEvents" DROP CONSTRAINT "CategoriesOnEvents_id_category_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnEvents" DROP CONSTRAINT "CategoriesOnEvents_id_event_fkey";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "id_category" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CategoriesOnEvents";

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
