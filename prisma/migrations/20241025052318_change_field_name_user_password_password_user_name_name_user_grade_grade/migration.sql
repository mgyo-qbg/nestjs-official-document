/*
  Warnings:

  - You are about to drop the column `user_grade` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_password` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `user_grade`,
    DROP COLUMN `user_name`,
    DROP COLUMN `user_password`,
    ADD COLUMN `grade` ENUM('ADMIN', 'GENERAL') NOT NULL DEFAULT 'GENERAL',
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
