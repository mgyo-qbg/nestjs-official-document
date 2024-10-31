/*
  Warnings:

  - The values [ARRIVED] on the enum `Book_book_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `book_status` ENUM('REQUEST_BUY', 'DELIVERING', 'RENTABLE', 'UNRENTABLE') NOT NULL;
