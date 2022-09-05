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
END