CREATE DATABASE  IF NOT EXISTS `project`;
USE `project`;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(45) NOT NULL unique,
  `pwd` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `profile_img` longblob
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


