import cassandra from "cassandra-driver";
import express from "express";

const router = express.Router();

const client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
});
client.connect(function (err, result) {
  console.log("agregarFarmacia: cassandra conectado");
});

/* Obtener Farmacias. */
router.get("/", function (req, res) {
  res.render("agregarFarmacia");
});

/* POST Agregar Farmacia */
router.post("/", function (req, res) {
  idFarmacia = cassandra.types.uuid();

  const insertFarmacia =
    "INSERT INTO farmacianosql.farmacias(idfarmacia, nombrefarmacia, direccionfarmacia, propietario,farmaceuticoencargado) VALUES(?,?,?,?,?)";

  client.execute(
    insertFarmacia,
    [
      idFarmacia,
      req.body.nombrefarmacia,
      req.body.direccionfarmacia,
      req.body.propietario,
      req.body.farmaceuticoencargado,
    ],
    function (err, result) {
      if (err) {
        res.status(404).send({ msg: err });
      } else {
        console.log("Farmacia Agregada");
        res.redirect("/");
      }
    }
  );
});

module.exports = router;
