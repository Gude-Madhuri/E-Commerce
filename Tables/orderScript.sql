USE `project`;

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int ,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `amount` int NOT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES `user` (`id`),
  FOREIGN KEY (product_id) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;





