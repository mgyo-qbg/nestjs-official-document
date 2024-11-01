/*
  Warnings:

  - The values [SIGN_OUT] on the enum `UserLog_work_name` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `UserLog` MODIFY `work_name` ENUM('SIGN_UP', 'SIGN_IN', 'DELETE_USER', 'CHANGE_PASSWORD', 'CHANGE_USER_GRADE') NOT NULL;
