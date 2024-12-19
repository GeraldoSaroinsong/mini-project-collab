-- AlterTable
ALTER TABLE "users" ALTER COLUMN "couponExpiredAt" DROP NOT NULL,
ALTER COLUMN "couponExpiredAt" DROP DEFAULT;
