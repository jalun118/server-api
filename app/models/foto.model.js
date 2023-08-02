module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      id_foto: String,
      link_foto: String,
      link_download_foto: String,
      link_original_foto: String,
      judul: String,
      deskripsi: String
    },
    {
      timestamps: true,
      unique: false
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Foto = mongoose.model("foto", schema);
  return Foto;
};