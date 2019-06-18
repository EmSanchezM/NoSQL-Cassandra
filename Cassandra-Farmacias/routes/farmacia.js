var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'],localDataCenter:'datacenter1'});
client.connect(function(err, result){
	console.log('farmacia: cassandra conectado');
});

var ObtenerFarmaciaporID = 'SELECT * FROM farmacianosql.farmacias WHERE idfarmacia = ?';

/* GET farmacias para listarlos. */
router.get('/:idfarmacia', function(req, res) {
	client.execute(ObtenerFarmaciaporID,[req.params.idfarmacia], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.render('farmacia', {
				idfarmacia: result.rows[0].idfarmacia,
				nombrefarmacia: result.rows[0].nombrefarmacia,
				direccionfarmacia: result.rows[0].direccionfarmacia,
                propietario: result.rows[0].propietario,
                farmaceuticoencargado: result.rows[0].farmaceuticoencargado,
			})
		}
	});
});

var borrarFarmacia = "DELETE FROM farmacianosql.farmacias WHERE idfarmacia = ?";

router.delete('/:idfarmacia', function(req, res){
	client.execute(borrarFarmacia,[req.params.idfarmacia], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.json(result);
		}
	});
});

module.exports = router;