module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        pieza : String,
        tipo: String,
        tamaño: String,
        marca: String,
        precio: Number
      },
      
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Herramienta = mongoose.model("herramienta", schema);
    return Herramienta;
  };