/*
  Warnings:

  - You are about to drop the column `is_deleted` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `BookOrderLog` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `BookRentalLog` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `UserLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Book` DROP COLUMN `is_deleted`;

-- AlterTable
ALTER TABLE `BookOrderLog` DROP COLUMN `is_deleted`;

-- AlterTable
ALTER TABLE `BookRentalLog` DROP COLUMN `is_deleted`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `is_deleted`;

-- AlterTable
ALTER TABLE `UserLog` DROP COLUMN `is_deleted`;
