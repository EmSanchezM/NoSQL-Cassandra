var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'],localDataCenter:'datacenter1'});
client.connect(function(err, result){
	console.log('editarFarmacia: cassandra conectado');
});

var obtenerFarmaciaporID = 'SELECT * FROM farmacianosql.farmacias WHERE idfarmacia = ?';

/* Obtener farmacia por id. */
router.get('/:idfarmacia', function(req, res) {
	client.execute(obtenerFarmaciaporID,[req.params.idfarmacia], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.render('editarFarmacia', {
				idfarmacia: result.rows[0].idfarmacia,
				nombrefarmacia: result.rows[0].nombrefarmacia,
				direccionfarmacia: result.rows[0].direccionfarmacia,
                propietario: result.rows[0].propietario,
                farmaceuticoencargado: result.rows[0].farmaceuticoencargado,
			})
		}
	});
});


/* POST Editar Farmacia */
router.post('/', function(req, res){
	var insertFarmacia = 'INSERT INTO farmacianosql.farmacias(idfarmacia, nombrefarmacia, direccionfarmacia,propietario,farmaceuticoencargado) VALUES(?,?,?,?,?)';

	client.execute(insertFarmacia, [req.body.idfarmacia, req.body.nombrefarmacia, req.body.direccionfarmacia, 
									req.body.propietario, req.body.farmaceuticoencargado],
		function(err, result){
			if(err){
			res.status(404).send({msg: err});
		} else {
			console.log('Farmacia Agregada');
			res.redirect('/');
		}
		});
});

module.exports = router;