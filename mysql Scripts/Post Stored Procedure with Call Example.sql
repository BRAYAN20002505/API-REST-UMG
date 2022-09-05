CALL `umg_test`.`AlumnoAddOrEdit`('Gabriel Samayoa', 0905, 15 , 9235, 'asdf5478');


DELIMITER $$
CREATE DEFINER=`lsamayoa`@`localhost` PROCEDURE `AlumnoAddOrEdit`(
  IN _nombre VARCHAR(45),
  IN _carrera INT,
  IN _año INT,
  IN _correlativo INT,
  IN _token VARCHAR (25)
)
BEGIN 
  
    INSERT INTO alumnos_token (nombre, carrera, año, correlativo, token)
    VALUES (_nombre, _carrera, _año, _correlativo, _token);

 
  SELECT _correlativo AS 'id';
END$$
DELIMITER ;

