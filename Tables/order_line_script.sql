CREATE DATABASE  IF NOT EXISTS `project`;
USE `project`;

DROP TABLE IF EXISTS `order_line`;

CREATE TABLE `order_line` (
  `order_line_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `order_id`int(11) DEFAULT NULL,
  `product_id`int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
   FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
   FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;





