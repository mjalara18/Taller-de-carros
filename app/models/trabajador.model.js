module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nombre : String,
        apellido: String,
        telefono: Number,
        cargo: String
      },
      
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Trabajador = mongoose.model("trabajador", schema);
    return Trabajador;
  };