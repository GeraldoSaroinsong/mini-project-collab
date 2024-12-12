-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'organizer');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('success', 'process', 'failed');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" "Role" NOT NULL,
    "image" TEXT,
    "referralCode" TEXT NOT NULL,
    "usingReferralCode" TEXT,
    "pointBalance" INTEGER NOT NULL DEFAULT 0,
    "expiredDates" TIMESTAMP(3)[],
    "coupon" BOOLEAN NOT NULL DEFAULT false,
    "couponExpiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationName" TEXT,
    "organizationEmail" TEXT,
    "organizationPhone" TEXT,
    "organizationAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "isPaidEvent" BOOLEAN NOT NULL,
    "price" INTEGER,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "image" TEXT NOT NULL,
    "id_organizer" INTEGER NOT NULL,
    "id_city" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Kategori',

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnEvents" (
    "id_event" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnEvents_pkey" PRIMARY KEY ("id_event","id_category")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Kota',

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "discountAmount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "id_event" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "subtotal" INTEGER NOT NULL,
    "referralCouponIsUsed" BOOLEAN NOT NULL DEFAULT false,
    "pointsUsed" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'process',
    "id_user" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,
    "id_promotion" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "image" TEXT,
    "id_transaction" INTEGER NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "id_transaction" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_referralCode_key" ON "users"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_id_transaction_key" ON "ratings"("id_transaction");

-- CreateIndex
CREATE UNIQUE INDEX "payments_id_transaction_key" ON "payments"("id_transaction");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_usingReferralCode_fkey" FOREIGN KEY ("usingReferralCode") REFERENCES "users"("referralCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_id_organizer_fkey" FOREIGN KEY ("id_organizer") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_id_city_fkey" FOREIGN KEY ("id_city") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnEvents" ADD CONSTRAINT "CategoriesOnEvents_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnEvents" ADD CONSTRAINT "CategoriesOnEvents_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_promotion_fkey" FOREIGN KEY ("id_promotion") REFERENCES "promotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_id_transaction_fkey" FOREIGN KEY ("id_transaction") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_id_transaction_fkey" FOREIGN KEY ("id_transaction") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
