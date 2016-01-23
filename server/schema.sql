CREATE DATABASE bananas;

USE bananas;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE `Users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NOT NULL DEFAULT 'NULL',
  `password` VARCHAR NOT NULL DEFAULT 'NULL',
  `houseId` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'House'
-- 
-- ---

DROP TABLE IF EXISTS `House`;
    
CREATE TABLE `House` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Chores'
-- 
-- ---

DROP TABLE IF EXISTS `Chores`;
    
CREATE TABLE `Chores` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `userId` INTEGER NOT NULL DEFAULT NULL,
  `name` VARCHAR NOT NULL DEFAULT 'NULL',
  `category` VARCHAR NOT NULL DEFAULT 'NULL',
  `completed` TINYINT NOT NULL DEFAULT 0,
  `dueDate` DATE NULL DEFAULT NULL,
  `houseId` INT NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Messages'
-- 
-- ---

DROP TABLE IF EXISTS `Messages`;
    
CREATE TABLE `Messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `userId` INTEGER NOT NULL DEFAULT NULL,
  `text` MEDIUMTEXT NOT NULL DEFAULT 'NULL',
  `houseId` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Bill'
-- 
-- ---

DROP TABLE IF EXISTS `Bill`;
    
CREATE TABLE `Bill` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `userId` INTEGER NOT NULL DEFAULT NULL,
  `total` INT NOT NULL DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `dueDate` DATE NOT NULL DEFAULT 'NULL',
  `datePaid` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Payment'
-- 
-- ---

DROP TABLE IF EXISTS `Payment`;
    
CREATE TABLE `Payment` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `billId` INTEGER NOT NULL DEFAULT NULL,
  `userId` INTEGER NOT NULL DEFAULT NULL,
  `amount` INT NOT NULL DEFAULT NULL,
  `paid` TINYINT NOT NULL DEFAULT NULL,
  `datePaid` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Users` ADD FOREIGN KEY (houseId) REFERENCES `House` (`id`);
ALTER TABLE `Chores` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (houseId) REFERENCES `House` (`id`);
ALTER TABLE `Bill` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `Payment` ADD FOREIGN KEY (billId) REFERENCES `Bill` (`id`);
ALTER TABLE `Payment` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `House` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Chores` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Bill` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Payment` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`name`,`password`,`houseId`) VALUES
-- ('','','','');
-- INSERT INTO `House` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `Chores` (`id`,`userId`,`name`,`category`,`completed`,`dueDate`,`houseId`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Messages` (`id`,`userId`,`text`,`houseId`) VALUES
-- ('','','','');
-- INSERT INTO `Bill` (`id`,`userId`,`total`,`name`,`dueDate`,`datePaid`) VALUES
-- ('','','','','','');
-- INSERT INTO `Payment` (`id`,`billId`,`userId`,`amount`,`paid`,`datePaid`) VALUES
-- ('','','','','','');