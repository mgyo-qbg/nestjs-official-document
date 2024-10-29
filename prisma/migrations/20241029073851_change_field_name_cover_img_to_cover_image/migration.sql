/*
  Warnings:

  - You are about to drop the column `cover_img` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Book` DROP COLUMN `cover_img`,
    ADD COLUMN `cover_image` VARCHAR(191) NULL;
