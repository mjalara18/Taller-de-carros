const { usuarios } = require("../models");
const db = require("../models");
const Usuario = db.usuarios;



exports.create = (req, res) => {
    if (!req.body.nombre) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const usuario = new Usuario ({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        carro: req.body.carro,

    });
  
    usuario
      .save(usuario)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Usuario."
        });
      });
};

exports.findAll = (req, res) => {
    const usuario = req.query.usuario;
    var condition = usuario ? { usuario: { $regex: new RegExp(usuario), $options: "i" } } : {};
  
    Usuario.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Usuario."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Usuario with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Usuario with id=" + id });
    });
};

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Usuario.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Usuario with id=${id}. Maybe Usuario was not found!`
          });
        } else res.send({ message: "Usuario was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Usuario with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Usuario.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Usuario with id=${id}. Maybe Usuario was not found!`
          });
        } else {
          res.send({
            message: "Usuario was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Usuario with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Usuario.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Usuario were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Usuario."
        });
      });
};