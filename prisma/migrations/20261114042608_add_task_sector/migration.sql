-- AlterTable
ALTER TABLE `task` ADD COLUMN `sectorId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Task_sectorId_idx` ON `Task`(`sectorId`);

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
