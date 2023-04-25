const { query } = require("express");
const { carros } = require("../models");
const db = require("../models");
const Carro = db.carros;



exports.create = (req, res) => {
    if (!req.body.marca) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const carro = new Carro ({
        marca : req.body.marca,
        kilometraje: req.body.kilometraje,
        requqeimientoDePieza: req.body.requqeimientoDePieza,
        piezaRequerida: req.body.piezaRequerida,
        vecesReparado: req.body.vecesReparado

    });
  
    carro
      .save(carro)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Carro."
        });
      });
};

exports.findAll = (req, res) => {
    const marca = req.query.marca;
    var condition = marca ? { marca: { $regex: new RegExp(marca), $options: "i" } } : {};
  
    Carro.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Carro."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Carro.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Carro with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Carro with id=" + id });
    });
};

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Carro.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Carro with id=${id}. Maybe Carro was not found!`
          });
        } else res.send({ message: "Carro was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Carro with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Carro.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Carro with id=${id}. Maybe Carro was not found!`
          });
        } else {
          res.send({
            message: "Carro was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Carro with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Carro.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Carro were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Carro."
        });
      });
};