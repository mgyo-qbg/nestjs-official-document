/*
  Warnings:

  - You are about to drop the `RentalHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `RentalHistory` DROP FOREIGN KEY `RentalHistory_rental_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `RentalHistory` DROP FOREIGN KEY `RentalHistory_rental_user_id_fkey`;

-- DropTable
DROP TABLE `RentalHistory`;
