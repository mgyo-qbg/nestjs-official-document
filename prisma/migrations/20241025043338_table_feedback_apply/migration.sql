/*
  Warnings:

  - You are about to drop the column `bookStatus` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `borrowerId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `coverImg` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `requesterId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `BookLog` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `BookLog` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `BookLog` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedDate` on the `BookLog` table. All the data in the column will be lost.
  - You are about to alter the column `work_name` on the `BookLog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the column `createdDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `loginPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `UserLog` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `UserLog` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedDate` on the `UserLog` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserLog` table. All the data in the column will be lost.
  - You are about to alter the column `work_name` on the `UserLog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - Added the required column `book_status` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_date` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `book_id` to the `BookLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_date` to the `BookLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `worker_id` to the `BookLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `login_password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_date` to the `UserLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `worker_id` to the `UserLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_borrowerId_fkey`;

-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_requesterId_fkey`;

-- DropForeignKey
ALTER TABLE `BookLog` DROP FOREIGN KEY `BookLog_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `UserLog` DROP FOREIGN KEY `UserLog_userId_fkey`;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `bookStatus`,
    DROP COLUMN `borrowerId`,
    DROP COLUMN `coverImg`,
    DROP COLUMN `createdDate`,
    DROP COLUMN `deleted`,
    DROP COLUMN `modifiedDate`,
    DROP COLUMN `requesterId`,
    ADD COLUMN `book_status` VARCHAR(191) NOT NULL,
    ADD COLUMN `borrower_id` INTEGER NULL,
    ADD COLUMN `cover_img` VARCHAR(191) NULL,
    ADD COLUMN `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `modified_date` DATETIME(3) NOT NULL,
    ADD COLUMN `requester_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `BookLog` DROP COLUMN `bookId`,
    DROP COLUMN `createdDate`,
    DROP COLUMN `deleted`,
    DROP COLUMN `modifiedDate`,
    ADD COLUMN `book_id` INTEGER NOT NULL,
    ADD COLUMN `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `modified_date` DATETIME(3) NOT NULL,
    ADD COLUMN `worker_id` INTEGER NOT NULL,
    MODIFY `work_name` ENUM('REGISTRATION_BOOK', 'DELETE_BOOK', 'CHANGE_BOOK_STATUS_TO_REQUEST_BUY', 'CHAGNE_BOOK_STATUS_TO_DELIVERING', 'CHANGE_BOOK_STATUS_TO_RENTABLE', 'CHANGE_BOOK_STATUS_TO_UNRENTABLE') NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createdDate`,
    DROP COLUMN `deleted`,
    DROP COLUMN `loginPassword`,
    DROP COLUMN `modifiedDate`,
    DROP COLUMN `userName`,
    ADD COLUMN `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `login_password` VARCHAR(191) NOT NULL,
    ADD COLUMN `modified_date` DATETIME(3) NOT NULL,
    ADD COLUMN `user_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserLog` DROP COLUMN `createdDate`,
    DROP COLUMN `deleted`,
    DROP COLUMN `modifiedDate`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `modified_date` DATETIME(3) NOT NULL,
    ADD COLUMN `worker_id` INTEGER NOT NULL,
    MODIFY `work_name` ENUM('SIGN_UP', 'SIGN_IN', 'DELETE_USER', 'CHANGE_PASSWORD', 'CHANGE_USER_GRADE') NOT NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_requester_id_fkey` FOREIGN KEY (`requester_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_borrower_id_fkey` FOREIGN KEY (`borrower_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookLog` ADD CONSTRAINT `BookLog_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookLog` ADD CONSTRAINT `BookLog_worker_id_fkey` FOREIGN KEY (`worker_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLog` ADD CONSTRAINT `UserLog_worker_id_fkey` FOREIGN KEY (`worker_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
