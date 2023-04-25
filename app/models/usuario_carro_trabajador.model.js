module.exports = mongoose => {
    var Usuario = mongoose.model('usuario');
    var Carro = mongoose.model('carro');
    var Trabajador = mongoose.model('carro');

    var Schema = mongoose.Schema; 

    var schema = mongoose.Schema(
      {
        usuario: { type: Schema.ObjectId, ref: "Usuario" },
        carro: {type: Schema.ObjectId, ref: "Carro"},
        trabajador: {type: Schema.ObjectId, ref: "Trabajador"},
        cantidad: Number,
        reparacion: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const UsuarioCarroTrabajador = mongoose.model("usuarioCarroTrabajador", schema);
    return UsuarioCarroTrabajador;
  };