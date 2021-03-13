-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: brewprofiler
-- ------------------------------------------------------
-- Server version	5.7.32-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `baristas`
--

DROP TABLE IF EXISTS `baristas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baristas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_active` tinyint(1) DEFAULT '1',
  `role` int(11) DEFAULT '2',
  `username` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `bloom` int(11) DEFAULT NULL,
  `password` varchar(64) NOT NULL,
  `_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `role` (`role`),
  CONSTRAINT `baristas_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baristas`
--

LOCK TABLES `baristas` WRITE;
/*!40000 ALTER TABLE `baristas` DISABLE KEYS */;
INSERT INTO `baristas` VALUES (1,1,1,'1','1',45,'$2b$12$KMzvMphHBIwLJQU/y8ToXuZ6JIVj7FXiUcKLJ.XjZDP4mkRrfMSW2','2021-03-02 00:16:10'),(2,1,2,'2','2',2,'$2b$12$YOQlGwnnGyFEJC4tgwvbeO5/aj8MqZszoPvxUx5qt3OFDuxD8W9AS','2021-03-13 04:02:26'),(3,1,2,'3','3',30,'$2b$12$ujOlAjd6ihk4DDEvSNak6eq9NV3vF6kApyVLIEUxlnYj3jh5LTNeq','2021-03-13 05:05:18');
/*!40000 ALTER TABLE `baristas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_active` tinyint(1) DEFAULT '1',
  `name` varchar(64) NOT NULL,
  `barista` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,1,'Hyperion Coffee Company',1),(2,1,'Peace Coffee Company',1),(3,1,'Anodyne Coffee Company',1),(4,1,'Dogwood Coffee Company',1),(6,1,'Someone in Portland',2),(7,1,'Intelli',3);
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brewmethods`
--

DROP TABLE IF EXISTS `brewmethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brewmethods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brewmethods`
--

LOCK TABLES `brewmethods` WRITE;
/*!40000 ALTER TABLE `brewmethods` DISABLE KEYS */;
INSERT INTO `brewmethods` VALUES (1,'Chemex',1),(2,'Hario V60',0),(3,'Kona',0),(4,'Aero-Press',0),(5,'French Press',0),(6,'Kalita Wave',1),(7,'Clever',1);
/*!40000 ALTER TABLE `brewmethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brewphotos`
--

DROP TABLE IF EXISTS `brewphotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brewphotos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brewphotos`
--

LOCK TABLES `brewphotos` WRITE;
/*!40000 ALTER TABLE `brewphotos` DISABLE KEYS */;
/*!40000 ALTER TABLE `brewphotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brews`
--

DROP TABLE IF EXISTS `brews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_active` tinyint(1) DEFAULT '1',
  `_createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `barista` int(11) NOT NULL,
  `brewmethod` int(11) NOT NULL,
  `coffeebag` int(11) NOT NULL,
  `filter` int(11) DEFAULT NULL,
  `roasteddate` date DEFAULT NULL,
  `grinder` int(11) DEFAULT NULL,
  `grindsize` tinyint(1) DEFAULT NULL,
  `gramspostgrind` decimal(5,2) DEFAULT NULL,
  `watertempprebrew` decimal(5,2) DEFAULT NULL,
  `watertemppostbrew` decimal(5,2) DEFAULT NULL,
  `bloomtimeinsec` int(11) DEFAULT NULL,
  `bloomweight` decimal(5,2) DEFAULT NULL,
  `brewtimeinsec` int(11) DEFAULT NULL,
  `brewweight` decimal(5,2) DEFAULT NULL,
  `drawdownstart` int(11) DEFAULT NULL,
  `yeild` decimal(5,2) DEFAULT NULL,
  `tastingnote` varchar(10000) DEFAULT NULL,
  `brewingnote` varchar(10000) DEFAULT NULL,
  `brewphoto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `barista` (`barista`),
  KEY `brewmethod` (`brewmethod`),
  KEY `coffeebag` (`coffeebag`),
  KEY `grinder` (`grinder`),
  KEY `brewphoto` (`brewphoto`),
  CONSTRAINT `brews_ibfk_1` FOREIGN KEY (`barista`) REFERENCES `baristas` (`id`),
  CONSTRAINT `brews_ibfk_2` FOREIGN KEY (`brewmethod`) REFERENCES `brewmethods` (`id`),
  CONSTRAINT `brews_ibfk_3` FOREIGN KEY (`coffeebag`) REFERENCES `coffeebags` (`id`),
  CONSTRAINT `brews_ibfk_4` FOREIGN KEY (`grinder`) REFERENCES `grinders` (`id`),
  CONSTRAINT `brews_ibfk_6` FOREIGN KEY (`brewphoto`) REFERENCES `brewphotos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brews`
--

LOCK TABLES `brews` WRITE;
/*!40000 ALTER TABLE `brews` DISABLE KEYS */;
INSERT INTO `brews` VALUES (1,1,'2021-03-02 16:40:23',1,1,6,2,'2021-02-09',1,24,36.00,212.00,0.00,45,60.50,306,604.00,NULL,548.00,NULL,NULL,NULL),(3,1,'2021-03-03 17:34:43',1,1,6,2,'2021-02-09',1,24,36.00,212.00,0.00,45,65.50,320,603.00,NULL,553.00,NULL,NULL,NULL),(10,1,'2021-03-04 18:13:49',1,7,7,1,'2021-02-25',1,24,25.00,212.00,0.00,45,55.50,273,402.00,150,343.00,NULL,NULL,NULL),(11,0,'2021-03-04 20:22:14',1,1,2,2,'2021-02-25',1,24,25.00,212.00,0.00,45,55.50,0,402.00,NULL,0.00,NULL,NULL,NULL),(12,1,'2021-03-05 17:34:58',1,7,7,1,'2021-02-25',1,24,19.00,212.00,0.00,49,56.00,218,319.00,130,278.00,NULL,NULL,NULL),(13,0,'2021-03-05 18:06:18',1,7,7,1,'2021-02-25',1,24,19.00,212.00,0.00,45,56.00,0,319.00,NULL,0.00,NULL,NULL,NULL),(14,1,'2021-03-05 18:35:20',1,7,7,1,'2021-02-25',1,23,19.00,212.00,0.00,45,49.50,238,320.00,150,256.00,NULL,NULL,NULL),(15,0,'2021-03-06 05:41:20',1,7,2,1,'2021-02-25',1,0,0.00,212.00,0.00,45,0.00,258,0.00,135,0.00,NULL,NULL,NULL),(16,0,'2021-03-06 05:52:26',1,7,2,1,'2021-02-25',1,0,0.00,212.00,0.00,45,0.00,210,0.00,150,0.00,NULL,NULL,NULL),(17,0,'2021-03-06 05:55:13',1,7,2,1,'2021-02-25',1,0,0.00,212.00,0.00,45,0.00,600,0.00,300,0.00,NULL,NULL,NULL),(18,0,'2021-03-06 05:55:40',1,7,7,1,'2021-02-25',1,0,0.00,212.00,0.00,45,0.00,600,0.00,150,0.00,NULL,NULL,NULL),(19,0,'2021-03-06 06:37:32',1,7,2,1,'2021-02-25',1,0,0.00,212.00,0.00,45,0.00,225,0.00,150,0.00,NULL,NULL,NULL),(20,0,'2021-03-06 06:51:21',1,7,6,1,'2021-02-25',1,0,0.00,212.00,0.00,45,0.00,0,0.00,150,0.00,NULL,NULL,NULL),(21,1,'2021-03-06 15:28:18',1,7,7,1,'2021-02-25',1,22,20.00,212.00,0.00,45,55.00,278,327.00,168,274.00,'A bit sour and bitter. Did not enjoy.','',NULL),(22,1,'2021-03-06 16:00:34',1,7,7,1,'2021-02-25',1,23,19.00,212.00,0.00,45,53.00,235,306.00,150,258.50,NULL,NULL,NULL),(23,1,'2021-03-07 17:13:41',1,7,7,1,'2021-02-25',1,23,19.00,212.00,0.00,45,55.50,232,307.00,153,258.00,NULL,NULL,NULL),(24,1,'2021-03-08 17:17:44',1,1,7,2,'2021-02-25',1,24,19.00,212.00,0.00,45,38.50,194,300.00,NULL,276.00,NULL,NULL,NULL),(25,0,'2021-03-08 18:06:34',1,7,2,1,'2021-02-25',1,23,19.00,212.00,0.00,45,55.50,232,307.00,153,0.00,NULL,NULL,NULL),(26,0,'2021-03-09 02:07:56',1,7,2,1,'2021-02-25',1,24,19.00,212.00,0.00,45,55.50,232,307.00,153,250.00,NULL,NULL,NULL),(27,1,'2021-03-09 15:52:29',1,7,7,1,'2021-02-25',1,24,19.00,212.00,0.00,45,60.00,255,311.00,137,276.00,'','Tore the filter with my mixing spoon during drawdown. Total Bodge. Higher yeild is a direct result of of the filter failing.',NULL),(28,1,'2021-03-10 15:49:12',1,7,7,1,'2021-02-25',1,24,20.00,212.00,0.00,45,50.50,230,363.00,154,309.00,NULL,NULL,NULL),(29,0,'2021-03-10 16:23:58',1,6,2,1,'2021-02-25',1,0,0.00,212.00,0.00,45,0.00,0,0.00,NULL,0.00,NULL,NULL,NULL),(30,0,'2021-03-12 01:24:13',1,6,2,6,'2021-02-25',1,0,0.00,212.00,0.00,45,0.00,0,0.00,NULL,0.00,NULL,NULL,NULL),(31,0,'2021-03-12 04:23:53',1,7,2,1,'2021-02-25',1,24,20.00,212.00,0.00,45,50.50,300,363.00,240,0.00,NULL,NULL,NULL),(32,0,'2021-03-12 04:31:35',1,7,3,7,'2021-03-04',5,13,10.00,100.00,69.00,99,100.00,300,500.00,240,300.00,NULL,NULL,NULL),(33,0,'2021-03-12 04:33:08',1,1,2,1,'2021-02-25',1,24,19.00,212.00,0.00,45,38.50,0,320.00,367,0.00,NULL,NULL,NULL),(34,0,'2021-03-12 04:34:58',1,1,2,1,'2021-02-25',1,24,19.00,212.00,0.00,45,38.50,0,320.00,NULL,0.00,NULL,NULL,NULL),(35,0,'2021-03-12 04:40:07',1,6,2,6,'2021-02-25',1,0,0.00,212.00,0.00,45,0.00,0,0.00,NULL,0.00,NULL,NULL,NULL),(36,1,'2021-03-12 15:56:22',1,7,7,1,'2021-02-25',1,22,18.50,212.00,0.00,45,51.50,290,314.00,136,253.00,'Still slightly less than impressed with the Clever brew method. This could be due to the fact that I have only used previously untasted beans for this method as I\'m out of Hyperion at the moment. I could be chasing Chemex clarity, but who knows. After a moment to cool, the cup tastes nicer. I would maybe keep this ratio, but see what I can do about the drawdown time.','I cut the brew when the water level hit the coffee bed. Smaller yield and much longer drawdown time likely due to this and also the smaller grind size.',NULL),(37,0,'2021-03-13 03:02:48',1,1,5,1,'2021-02-25',1,24,19.00,212.00,0.00,45,38.50,150,320.00,NULL,0.00,NULL,NULL,NULL),(38,0,'2021-03-13 03:03:20',1,1,5,1,'2021-02-25',1,24,19.00,212.00,0.00,45,38.50,150,320.00,NULL,0.00,NULL,NULL,NULL),(39,0,'2021-03-13 03:08:46',1,1,8,1,'2021-02-25',1,24,19.00,212.00,0.00,45,38.50,150,320.00,NULL,0.00,NULL,NULL,NULL),(40,0,'2021-03-13 03:25:27',1,6,2,6,'2021-02-25',1,0,0.00,212.00,0.00,45,0.00,0,0.00,NULL,0.00,NULL,NULL,NULL),(42,0,'2021-03-13 03:29:34',1,7,2,1,'2021-02-25',1,22,18.50,212.00,0.00,45,51.50,290,314.00,136,0.00,'','',NULL),(44,0,'2021-03-13 03:32:25',1,1,2,1,'2021-02-25',1,24,19.00,212.00,0.00,45,38.50,150,320.00,NULL,0.00,NULL,NULL,NULL),(46,0,'2021-03-13 04:19:53',2,1,10,1,'1970-01-01',1,0,0.00,212.00,0.00,2,0.00,0,0.00,0,0.00,'This was a test','so was this',NULL),(47,0,'2021-03-13 04:21:03',2,6,10,1,'1970-01-01',1,0,0.00,212.00,0.00,2,0.00,0,0.00,0,0.00,'','',NULL),(48,0,'2021-03-13 04:35:03',2,7,10,1,'1970-01-01',1,0,0.00,212.00,0.00,2,0.00,180,0.00,120,0.00,'','',NULL),(49,0,'2021-03-13 04:41:59',2,1,10,2,'2021-03-05',1,22,19.00,212.00,0.00,30,60.00,225,300.00,NULL,258.00,NULL,NULL,NULL),(50,1,'2021-03-13 04:49:24',2,1,10,1,'2021-03-05',1,22,0.00,212.00,0.00,2,60.00,225,300.00,NULL,0.00,NULL,NULL,NULL),(51,1,'2021-03-13 04:50:16',2,7,10,1,'2021-03-05',1,24,20.00,212.00,0.00,35,75.00,195,305.00,135,280.00,NULL,NULL,NULL),(52,0,'2021-03-13 05:03:23',2,6,10,1,'2021-03-05',1,0,0.00,212.00,0.00,2,0.00,0,0.00,NULL,0.00,NULL,NULL,NULL),(53,1,'2021-03-13 05:08:13',3,6,11,6,'2021-03-05',1,23,20.00,212.00,0.00,30,60.00,370,350.00,NULL,10.00,NULL,NULL,NULL),(54,1,'2021-03-13 05:09:27',3,7,11,1,'2021-03-05',1,5,18.00,212.00,0.00,30,75.00,300,500.00,120,50.00,NULL,NULL,NULL),(55,1,'2021-03-13 05:10:33',3,1,11,1,'2021-03-05',1,5,6.00,212.00,0.00,30,78.00,275,788.00,NULL,100.00,NULL,NULL,NULL),(56,1,'2021-03-13 05:24:54',3,6,11,6,'2021-03-05',1,23,20.00,212.00,0.00,30,60.00,370,350.00,0,300.00,'Poop and shoes','Spilled some',NULL),(57,0,'2021-03-13 05:36:24',1,7,8,1,'2021-03-05',1,5,18.00,212.00,0.00,45,75.00,300,500.00,120,300.00,NULL,NULL,NULL);
/*!40000 ALTER TABLE `brews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coffeebags`
--

DROP TABLE IF EXISTS `coffeebags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coffeebags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_active` tinyint(1) DEFAULT '1',
  `barista` int(11) NOT NULL,
  `brand` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `region` varchar(64) DEFAULT NULL,
  `elevationabovesealevelinmeters` int(11) DEFAULT NULL,
  `breed` varchar(64) DEFAULT NULL,
  `process` int(11) DEFAULT '4',
  `blend` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `barista` (`barista`),
  KEY `brand` (`brand`),
  KEY `process` (`process`),
  CONSTRAINT `coffeebags_ibfk_1` FOREIGN KEY (`barista`) REFERENCES `baristas` (`id`),
  CONSTRAINT `coffeebags_ibfk_2` FOREIGN KEY (`brand`) REFERENCES `brands` (`id`),
  CONSTRAINT `coffeebags_ibfk_3` FOREIGN KEY (`process`) REFERENCES `processes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coffeebags`
--

LOCK TABLES `coffeebags` WRITE;
/*!40000 ALTER TABLE `coffeebags` DISABLE KEYS */;
INSERT INTO `coffeebags` VALUES (2,1,1,2,'Nocturnal','',0,'',4,1),(3,0,1,2,'Tree Hugger','',0,'',4,1),(4,0,1,2,'Peru','Peru',0,'',4,0),(5,0,1,2,'Birchwood Breakfast Blend','',0,'',4,1),(6,1,1,1,'Anzueto Family - Finga Providencia','Huehuetenango, Guatemala',1700,'Typica',1,0),(7,1,1,4,'Neon','Ethiopia and Colombia',0,'',4,1),(8,1,1,1,'Jose Laris Membreno','Honduras',1365,'Red and Yellow Catuai',1,0),(9,0,1,3,'Delete Me2','Butt2',12,'Eric2',2,1),(10,1,2,6,'Fake Portland','Oregon',10,'Whisky',1,0),(11,1,3,7,'Butt Rott','USA',666,'Steve',1,0);
/*!40000 ALTER TABLE `coffeebags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filters`
--

DROP TABLE IF EXISTS `filters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barista` int(11) DEFAULT NULL,
  `brand_name_style` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filters`
--

LOCK TABLES `filters` WRITE;
/*!40000 ALTER TABLE `filters` DISABLE KEYS */;
INSERT INTO `filters` VALUES (1,1,'Beyond Gourmet - Unbleached - 4'),(2,1,'Chemex - Bleached - 3 Cup'),(3,1,'Chemex - Bleached - 6 Cup'),(4,1,'Hario - Bleached - 4'),(5,1,'Kona - Gold - Cone'),(6,1,'Kalita Wave - Bleached - 155'),(7,1,'Kalita Wave - Bleached - 185');
/*!40000 ALTER TABLE `filters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grinders`
--

DROP TABLE IF EXISTS `grinders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grinders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grinders`
--

LOCK TABLES `grinders` WRITE;
/*!40000 ALTER TABLE `grinders` DISABLE KEYS */;
INSERT INTO `grinders` VALUES (1,'Baratza Encore'),(2,'Baratza Virtuoso+'),(3,'Baratza Sette 30'),(4,'Baratza Sette 270'),(5,'Baratza Vario'),(6,'Baratza Vario-W'),(7,'Baratza Forte AP');
/*!40000 ALTER TABLE `grinders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processes`
--

DROP TABLE IF EXISTS `processes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processes`
--

LOCK TABLES `processes` WRITE;
/*!40000 ALTER TABLE `processes` DISABLE KEYS */;
INSERT INTO `processes` VALUES (1,'Washed / Wet'),(2,'Natural / Dry'),(3,'Honey'),(4,'None');
/*!40000 ALTER TABLE `processes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'Guest');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tastingnotes`
--

DROP TABLE IF EXISTS `tastingnotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tastingnotes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notes` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tastingnotes`
--

LOCK TABLES `tastingnotes` WRITE;
/*!40000 ALTER TABLE `tastingnotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tastingnotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'brewprofiler'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-13  0:11:44
