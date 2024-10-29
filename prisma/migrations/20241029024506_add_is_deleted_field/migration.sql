-- AlterTable
ALTER TABLE `Book` ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `BookOrderLog` ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `BookRentalLog` ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `UserLog` ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false;
