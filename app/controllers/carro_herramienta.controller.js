const { carroHerramienta } = require("../models");
const db = require("../models");
const CarroHerramienta = db.carrosHerramientas;

exports.create = (req, res) => {
  if(!req.body.carro) { 
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const carroHerramienta = new CarroHerramienta ({
    carro: req.body.carro,
    pieza: req.body.pieza,
    precio: req.body.pieza,
    manoDeObra: req.body.manoDeObra,
    costoFinal: req.body.manoDeObra,
});

carroHerramienta
    .save(carroHerramienta)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the carroHerramienta."
      });
    });
};
 
exports.findAll = (req, res) => {
    const carro = req.query.carro;
    var condition = carro ? { usuario: { $regex: new RegExp(carro), $options: "i" } } : {};
  
    CarroHerramienta.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving CarroHerramienta."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    CarroHerramienta.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found CarroHerramienta with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving CarroHerramienta with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const carro = req.params.carro;
  
    CarroHerramienta.findByIdAndUpdate(carro, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update CarroHerramienta with id=${id}. Maybe CarroHerramienta was not found!`
          });
        } else res.send({ message: "CarroHerramienta was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating CarroHerramienta with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    CarroHerramienta.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete CarroHerramienta with id=${id}. Maybe CarroHerramienta was not found!`
          });
        } else {
          res.send({
            message: "CarroHerramienta was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete CarroHerramienta with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    CarroHerramienta.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} CarroHerramienta were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all CarroHerramienta."
      });
    });
};