CREATE DATABASE `service-tickets` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `service-tickets`.`tickets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `issued_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paid_at` DATETIME NULL,
  PRIMARY KEY (`id`));
