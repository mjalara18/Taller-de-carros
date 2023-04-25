module.exports = app => { 
    const usuariosCarrosTrabajados = require("../controllers/usuario_carro_trabajador.controller.js");
    var router = require("express").Router();
  
    router.post("/", usuariosCarrosTrabajados.create);
  
    router.get("/", usuariosCarrosTrabajados.findAll);

    router.get("/:id", usuariosCarrosTrabajados.findOne);

    router.put("/:id", usuariosCarrosTrabajados.update);

    router.delete("/:id", usuariosCarrosTrabajados.delete);

    router.delete("/", usuariosCarrosTrabajados.deleteAll);

    app.use('/api/usuariosCarrosTrabajados', router);

  };