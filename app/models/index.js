const dbConfig = require('../config/db.config.js');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.usuarios = require('./usuario.model.js')(mongoose);
db.carros = require('./carro.model.js')(mongoose);
db.trabajadores = require('./trabajador.model.js')(mongoose);
db.herramientas = require('./herramienta.model.js')(mongoose);
db.usuariosCarrosTrabajados = require('./usuario_carro_trabajador.model.js')(mongoose);
db.carrosHerramientas = require('./carro_herramienta.model.js')(mongoose);

module.exports = db