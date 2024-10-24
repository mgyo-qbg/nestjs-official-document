/*
  Warnings:

  - You are about to alter the column `user_grade` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `user_grade` ENUM('ADMIN', 'GENERAL') NOT NULL DEFAULT 'GENERAL';
