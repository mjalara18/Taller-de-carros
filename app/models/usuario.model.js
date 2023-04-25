module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nombre : String,
        apellido: String,
        direccion: String,
        telefono: Number,
        carro: String
      },
      
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Usuario = mongoose.model("usuario", schema);
    return Usuario;
  };