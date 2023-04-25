const { trabajadores } = require("../models");
const db = require("../models");
const Trabajador = db.trabajadores;



exports.create = (req, res) => {
    if (!req.body.nombre) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const trabajador = new Trabajador ({
        nombre : req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        cargo: req.body.cargo

    });
  
    trabajador
      .save(trabajador)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Trabajador."
        });
      });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};
  
    Trabajador.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Trabajador."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Trabajador.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Trabajador with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Trabajador with id=" + id });
    });
};

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Trabajador.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Trabajador with id=${id}. Maybe Trabajador was not found!`
          });
        } else res.send({ message: "Trabajador was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Trabajador with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Trabajador.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Trabajador with id=${id}. Maybe Trabajador was not found!`
          });
        } else {
          res.send({
            message: "Trabajador was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Trabajador with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Trabajador.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Trabajador were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Trabajador."
        });
      });
};