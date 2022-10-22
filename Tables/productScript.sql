CREATE DATABASE  IF NOT EXISTS `project`;
USE `project`;

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(45) NOT NULL UNIQUE,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` varchar(45) DEFAULT NULL ,
  `image` longblob ,
  `is_active` bool DEFAULT TRUE,
  `category_id`int(11) DEFAULT NULL,
   FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;





