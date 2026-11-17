-- CreateTable
CREATE TABLE `TaskHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `actorUserId` INTEGER NOT NULL,
    `action` ENUM('CREATED', 'ASSIGNED', 'STATUS_CHANGED', 'ITEM_COMPLETED', 'OBSERVATION_ADDED') NOT NULL,
    `taskItemId` INTEGER NULL,
    `oldStatus` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NULL,
    `newStatus` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NULL,
    `observation` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TaskHistory_taskId_createdAt_idx`(`taskId`, `createdAt`),
    INDEX `TaskHistory_actorUserId_createdAt_idx`(`actorUserId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskHistory` ADD CONSTRAINT `TaskHistory_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
