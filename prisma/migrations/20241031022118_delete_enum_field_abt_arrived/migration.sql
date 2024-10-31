/*
  Warnings:

  - The values [CHANGE_BOOK_STATUS_TO_ARRIVED] on the enum `BookOrderLog_work_name` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `BookOrderLog` MODIFY `work_name` ENUM('CHANGE_BOOK_STATUS_TO_REQUEST_BUY', 'CHANGE_BOOK_STATUS_TO_DELIVERING') NOT NULL;
