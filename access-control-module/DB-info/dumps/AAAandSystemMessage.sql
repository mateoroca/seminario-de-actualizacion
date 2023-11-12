-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.42-log

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
-- Table structure for table `access`
--

DROP TABLE IF EXISTS `access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access`
--

LOCK TABLES `access` WRITE;
/*!40000 ALTER TABLE `access` DISABLE KEYS */;
INSERT INTO `access` VALUES (15,'login','user login','/sessionHandler/login'),(16,'logout','user log out ','/sessionHandler/logout'),(17,'getgroupsdata','get groups data ','/groupHandler/getgroupsdata'),(18,'getuserdata','get user data','/userHandler/getusers'),(19,'addusertogroup','add user to group','/groupHandler/addusertogroup'),(20,'signup','register new user','/sessionHandler/signup'),(21,'newchatmessage','creates and returns a chat message object','/chatmessagehandler/newchatmessage'),(22,'getchatmessages','get Messages of this chat','/chatmessagehandler/getchatmessages'),(23,'getactiveusers','getactiveusers','/sessionhandler/getactiveusers'),(24,'getchatproposal','getchatproposal','/chatproposalhandler/getchatproposal'),(25,'getchats','getchats','/chatHandler/getchats'),(26,'newchatproposal','newchatproposal','/chatproposalhandler/newchatproposal'),(27,'confirmchatproposal','confirmchatproposal','/chatproposalhandler/confirmchatproposal'),(28,'rejectchatproposal','rejectchatproposal','/chatproposalhandler/rejectchatproposal'),(29,'deletechatproposal','deletechatproposal','/chatproposalhandler/deletechatproposal');
/*!40000 ALTER TABLE `access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `data_user`
--

DROP TABLE IF EXISTS `data_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_user`
--

LOCK TABLES `data_user` WRITE;
/*!40000 ALTER TABLE `data_user` DISABLE KEYS */;
INSERT INTO `data_user` VALUES (66,'mateo','roca','mateo@gmail.com',1),(71,'mike','funning','mike@gmail.com',1),(72,'bruse','waine','batman@gmail.com',1);
/*!40000 ALTER TABLE `data_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (13,'admin'),(15,'guest'),(16,'preseptor');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_access`
--

DROP TABLE IF EXISTS `group_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accessID` int(11) DEFAULT NULL,
  `groupID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `accessID` (`accessID`),
  KEY `groupID` (`groupID`),
  CONSTRAINT `group_access_ibfk_1` FOREIGN KEY (`accessID`) REFERENCES `access` (`id`),
  CONSTRAINT `group_access_ibfk_2` FOREIGN KEY (`groupID`) REFERENCES `group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_access`
--

LOCK TABLES `group_access` WRITE;
/*!40000 ALTER TABLE `group_access` DISABLE KEYS */;
INSERT INTO `group_access` VALUES (6,16,15),(7,17,13),(8,18,13),(9,19,13),(10,15,15),(11,16,15),(12,20,15),(13,21,15),(14,22,15),(15,23,15),(16,24,15),(17,25,15),(18,26,15),(19,27,15),(20,28,15),(21,29,15),(22,18,15);
/*!40000 ALTER TABLE `group_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_has_user`
--

DROP TABLE IF EXISTS `group_has_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_has_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_has_userID` int(11) NOT NULL,
  `user_has_groupID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id_idx` (`group_has_userID`),
  KEY `user_id_idx` (`user_has_groupID`),
  CONSTRAINT `group_id` FOREIGN KEY (`group_has_userID`) REFERENCES `group` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_id` FOREIGN KEY (`user_has_groupID`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_has_user`
--

LOCK TABLES `group_has_user` WRITE;
/*!40000 ALTER TABLE `group_has_user` DISABLE KEYS */;
INSERT INTO `group_has_user` VALUES (30,15,48),(35,15,53),(40,16,44),(41,13,48),(42,15,54),(43,15,44);
/*!40000 ALTER TABLE `group_has_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueUserName` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (44,'shack12','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'),(48,'teico12','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'),(53,'mike','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'),(54,'batman','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_data`
--

DROP TABLE IF EXISTS `user_has_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID_has_data` int(11) NOT NULL,
  `dataID_user_has_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userID_has_data_UNIQUE` (`userID_has_data`),
  UNIQUE KEY `dataID_user_has_user_UNIQUE` (`dataID_user_has_user`),
  CONSTRAINT `userDataID` FOREIGN KEY (`dataID_user_has_user`) REFERENCES `data_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userID` FOREIGN KEY (`userID_has_data`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_data`
--

LOCK TABLES `user_has_data` WRITE;
/*!40000 ALTER TABLE `user_has_data` DISABLE KEYS */;
INSERT INTO `user_has_data` VALUES (19,48,66),(24,53,71),(25,54,72);
/*!40000 ALTER TABLE `user_has_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-11 14:31:11
