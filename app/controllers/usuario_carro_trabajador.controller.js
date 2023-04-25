const { usuariosCarrosTrabajados } = require("../models");
const db = require("../models");
const UsuarioCarroTrabajador = db.usuariosCarrosTrabajados;

exports.create = (req, res) => {
  if(!req.body.usuario) { 
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const usuarioCarroTrabajador = new UsuarioCarroTrabajador ({
    usuario: req.body.usuario,
    carro: req.body.carro,
    trabajador: req.body.trabajador,
    cantidad: req.body.cantidad,
    reparacion : req.body.reparacion,

});

usuarioCarroTrabajador
    .save(usuarioCarroTrabajador)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the usuarioCarroTrabajador."
      });
    });
};
 
exports.findAll = (req, res) => {
    const usuario = req.query.usuario;
    var condition = usuario ? { usuario: { $regex: new RegExp(usuario), $options: "i" } } : {};
  
    UsuarioCarroTrabajador.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving UsuarioCarroTrabajador."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    UsuarioCarroTrabajador.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found UsuarioCarroTrabajador with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving UsuarioCarroTrabajador with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    UsuarioCarroTrabajador.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update UsuarioCarroTrabajador with id=${id}. Maybe UsuarioCarroTrabajador was not found!`
          });
        } else res.send({ message: "UsuarioCarroTrabajador was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating UsuarioCarroTrabajador with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    UsuarioCarroTrabajador.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete UsuarioCarroTrabajador with id=${id}. Maybe UsuarioCarroTrabajador was not found!`
          });
        } else {
          res.send({
            message: "UsuarioCarroTrabajador was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete UsuarioCarroTrabajador with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    UsuarioCarroTrabajador.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} UsuarioCarroTrabajador were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all UsuarioCarroTrabajador."
      });
    });
};