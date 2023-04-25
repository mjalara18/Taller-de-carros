module.exports = app => { 
    const herramientas = require("../controllers/herramienta.controller.js");
    var router = require("express").Router();
  
    router.post("/", herramientas.create);
  
    router.get("/", herramientas.findAll);

    router.get("/:id", herramientas.findOne);

    router.put("/:id", herramientas.update);

    router.delete("/:id", herramientas.delete);

    router.delete("/", herramientas.deleteAll);

    app.use('/api/herramientas', router);

  };