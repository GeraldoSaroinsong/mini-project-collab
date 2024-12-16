/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationName]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationEmail]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationPhone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationAddress]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_organizationName_key" ON "users"("organizationName");

-- CreateIndex
CREATE UNIQUE INDEX "users_organizationEmail_key" ON "users"("organizationEmail");

-- CreateIndex
CREATE UNIQUE INDEX "users_organizationPhone_key" ON "users"("organizationPhone");

-- CreateIndex
CREATE UNIQUE INDEX "users_organizationAddress_key" ON "users"("organizationAddress");
