-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mygamingdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mygamingdb` ;

-- -----------------------------------------------------
-- Schema mygamingdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mygamingdb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mygamingdb` ;

-- -----------------------------------------------------
-- Table `mygamingdb`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mygamingdb`.`games` (
  `idgame` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idgame`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mygamingdb`.`players`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mygamingdb`.`players` (
  `idplayers` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(2000) CHARACTER SET 'utf8mb3' NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idplayers`))
ENGINE = InnoDB
AUTO_INCREMENT = 27
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mygamingdb`.`scores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mygamingdb`.`scores` (
  `idscores` INT NOT NULL AUTO_INCREMENT,
  `score` DOUBLE NULL DEFAULT '0',
  `idgame` INT NULL DEFAULT NULL,
  `idplayers` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idscores`),
  INDEX `fk_scores_games1_idx` (`idgame` ASC) VISIBLE,
  INDEX `fk_scores_players1_idx` (`idplayers` ASC) VISIBLE,
  CONSTRAINT `fk_scores_games1`
    FOREIGN KEY (`idgame`)
    REFERENCES `mygamingdb`.`games` (`idgame`),
  CONSTRAINT `fk_scores_players1`
    FOREIGN KEY (`idplayers`)
    REFERENCES `mygamingdb`.`players` (`idplayers`))
ENGINE = InnoDB
AUTO_INCREMENT = 229
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `mygamingdb`.`games`
-- -----------------------------------------------------
START TRANSACTION;
USE `mygamingdb`;
INSERT INTO `mygamingdb`.`games` (`idgame`, `name`) VALUES (1, 'Guessing game');
INSERT INTO `mygamingdb`.`games` (`idgame`, `name`) VALUES (2, 'Find a pair');

COMMIT;

