module.exports = app => { 
    const carros = require("../controllers/carro.controller.js");
    var router = require("express").Router();
  
    router.post("/", carros.create);
  
    router.get("/", carros.findAll);

    router.get("/:id", carros.findOne);

    router.put("/:id", carros.update);

    router.delete("/:id", carros.delete);

    router.delete("/", carros.deleteAll);

    app.use('/api/carros', router);

  };