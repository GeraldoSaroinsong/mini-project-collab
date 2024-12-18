/*
  Warnings:

  - The `rating` column on the `ratings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "RatingValue";
