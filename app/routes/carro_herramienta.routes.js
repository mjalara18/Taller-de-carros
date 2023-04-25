module.exports = app => { 
    const carrosHerramientas = require("../controllers/carro_herramienta.controller.js");
    var router = require("express").Router();
  
    router.post("/", carrosHerramientas.create);
  
    router.get("/", carrosHerramientas.findAll);

    router.get("/:id", carrosHerramientas.findOne);

    router.put("/:id", carrosHerramientas.update);

    router.delete("/:id", carrosHerramientas.delete);

    router.delete("/", carrosHerramientas.deleteAll);

    app.use('/api/carrosHerramientas', router);

  };