 DROP TABLE IF EXISTS `alumnos_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos_token` (
  `nombre` VARCHAR(45) NOT NULL,
  `carrera` INT NOT NULL,
  `año` INT NOT NULL,
  `correlativo` INT NOT NULL,
  `token` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`carrera`,`año`,`correlativo`));
  
 