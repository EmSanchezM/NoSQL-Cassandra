/*Creamos la base de datos en cassandra se llama KEYSPACE*/

CREATE KEYSPACE "farmacianosql"
WITH replication = {
	'class' : 'SimpleStrategy',
	'replication_factor' : 3
};

/*Creamos las tablas de la base de datos*/

CREATE TABLE farmacianosql.Farmacias (
	"idFarmacia" uuid,
	"nombreFarmacia" text,
	"direccionFarmacia" text,
	"Propietario" text,
	"farmaceuticoEncargado" text,
	PRIMARY KEY ("idFarmacia")
);