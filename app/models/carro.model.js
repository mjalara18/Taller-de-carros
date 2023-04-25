module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        marca : String,
        kilometraje: String,
        requqeimientoDePieza: String,
        piezaRequerida: String,
        vecesReparado: Number
      },
      
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Carro = mongoose.model("carro", schema);
    return Carro;
  };