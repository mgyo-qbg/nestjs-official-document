/*
  Warnings:

  - You are about to drop the column `login_password` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `login_password`,
    ADD COLUMN `user_password` VARCHAR(191) NOT NULL;
