-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_id_promotion_fkey";

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "pointsUsed" SET DEFAULT 0,
ALTER COLUMN "id_promotion" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_promotion_fkey" FOREIGN KEY ("id_promotion") REFERENCES "promotions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
