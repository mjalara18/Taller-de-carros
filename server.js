const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:1904"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la app taller de carro" });
});

require("./app/routes/usuario.routes")(app);
require("./app/routes/carro.routes")(app);
require("./app/routes/trabajador.routes")(app);
require("./app/routes/herramienta.routes")(app);
require("./app/routes/usuario_carro_trabajador.routes")(app);
require("./app/routes/carro_herramienta.routes")(app);

const PORT = process.env.PORT || 1904;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });