/*
  Warnings:

  - Changed the type of `rating` on the `ratings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RatingValue" AS ENUM ('1', '2', '3', '4', '5');

-- AlterTable
ALTER TABLE "promotions" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "discountAmount" SET DEFAULT 10,
ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "endDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "rating",
ADD COLUMN     "rating" "RatingValue" NOT NULL;
