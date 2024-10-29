/*
  Warnings:

  - You are about to alter the column `book_status` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `book_status` ENUM('RENTABLE', 'UNRENTABLE') NOT NULL;
