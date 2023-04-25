module.exports = mongoose => {
    var Carro = mongoose.model('carro');
    var Herramienta = mongoose.model('herramienta');

    var Schema = mongoose.Schema; 

    var schema = mongoose.Schema(
      {
        carro: {type: Schema.ObjectId, ref: "Carro"},
        pieza: {type: Schema.ObjectId, ref: "Herramienta"},
        precio: {type: Schema.ObjectId, ref: "Herramienta"},
        manoDeObra: Number,
        costoFinal: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const CarroHerramienta = mongoose.model("carroHerramienta", schema);
    return CarroHerramienta;
  };