/*
  Warnings:

  - You are about to drop the `RentalList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `RentalList` DROP FOREIGN KEY `RentalList_rental_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `RentalList` DROP FOREIGN KEY `RentalList_rental_user_id_fkey`;

-- DropTable
DROP TABLE `RentalList`;

-- CreateTable
CREATE TABLE `RentalHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modified_date` DATETIME(3) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `rental_book_id` INTEGER NOT NULL,
    `rental_user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RentalHistory` ADD CONSTRAINT `RentalHistory_rental_book_id_fkey` FOREIGN KEY (`rental_book_id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RentalHistory` ADD CONSTRAINT `RentalHistory_rental_user_id_fkey` FOREIGN KEY (`rental_user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
