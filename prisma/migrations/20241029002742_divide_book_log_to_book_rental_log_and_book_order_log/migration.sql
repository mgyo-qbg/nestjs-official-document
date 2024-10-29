/*
  Warnings:

  - You are about to drop the `BookLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BookLog` DROP FOREIGN KEY `BookLog_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `BookLog` DROP FOREIGN KEY `BookLog_worker_id_fkey`;

-- AlterTable
ALTER TABLE `Book` MODIFY `book_status` ENUM('REQUEST_BUY', 'DELIVERING', 'ARRIVED', 'RENTABLE', 'UNRENTABLE') NOT NULL;

-- DropTable
DROP TABLE `BookLog`;

-- CreateTable
CREATE TABLE `BookRentalLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modified_date` DATETIME(3) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `work_name` ENUM('CHANGE_BOOK_STATUS_TO_RENTABLE', 'CHANGE_BOOK_STATUS_TO_UNRENTABLE') NOT NULL,
    `book_id` INTEGER NOT NULL,
    `worker_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookOrderLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modified_date` DATETIME(3) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `work_name` ENUM('CHANGE_BOOK_STATUS_TO_REQUEST_BUY', 'CHANGE_BOOK_STATUS_TO_DELIVERING', 'CHANGE_BOOK_STATUS_TO_ARRIVED') NOT NULL,
    `book_id` INTEGER NOT NULL,
    `worker_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookRentalLog` ADD CONSTRAINT `BookRentalLog_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookRentalLog` ADD CONSTRAINT `BookRentalLog_worker_id_fkey` FOREIGN KEY (`worker_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookOrderLog` ADD CONSTRAINT `BookOrderLog_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookOrderLog` ADD CONSTRAINT `BookOrderLog_worker_id_fkey` FOREIGN KEY (`worker_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
