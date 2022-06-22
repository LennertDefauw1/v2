/*
  Warnings:

  - You are about to drop the column `userId` on the `DigitalTwin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `DigitalTwin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `DigitalTwin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `DigitalTwin` DROP FOREIGN KEY `DigitalTwin_userId_fkey`;

-- AlterTable
ALTER TABLE `DigitalTwin` DROP COLUMN `userId`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `DigitalTwin_username_key` ON `DigitalTwin`(`username`);

-- AddForeignKey
ALTER TABLE `DigitalTwin` ADD CONSTRAINT `DigitalTwin_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
