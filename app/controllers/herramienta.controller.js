const { herramientas } = require("../models");
const db = require("../models");
const Herramienta = db.herramientas;



exports.create = (req, res) => {
    if (!req.body.pieza) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const herramienta = new Herramienta ({
        pieza: req.body.pieza,
        tipo: req.body.tipo,
        tamaño: req.body.tamaño,
        marca: req.body.marca,
        precio: req.body.precio

    });
  
    herramienta
      .save(herramienta)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Herramienta."
        });
      });
};

exports.findAll = (req, res) => {
    const pieza = req.query.pieza;
    var condition = pieza ? { pieza: { $regex: new RegExp(pieza), $options: "i" } } : {};
  
    Pieza.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Piezas."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Pieza.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Pieza with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Pieza with id=" + id });
    });
};

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Pieza.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Pieza with id=${id}. Maybe Pieza was not found!`
          });
        } else res.send({ message: "Pieza was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Pieza with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Pieza.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Pieza with id=${id}. Maybe Pieza was not found!`
          });
        } else {
          res.send({
            message: "Pieza was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Pieza with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Pieza.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Pieza were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Pieza."
        });
      });
};