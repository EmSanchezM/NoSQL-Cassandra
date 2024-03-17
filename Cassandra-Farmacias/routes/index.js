import cassandra from "cassandra-driver";
import express from "express";

const router = express.Router();

const client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
});

client.connect({
  function(err, result) {
    console.log("index: Cassandra Conectado");
  },
});

const obtenerTodasFarmacias = "SELECT * FROM farmacianosql.Farmacias";

router.get("/", function (req, res) {
  client.execute(obtenerTodasFarmacias, [], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.render("index", {
        farmacias: result.rows,
      });
    }
  });
});

module.exports = router;
