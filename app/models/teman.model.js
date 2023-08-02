module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      no_absen: Number,
      nama: String,
      kelas: String,
      pangkat: String
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

  const Teman = mongoose.model("teman", schema);
  return Teman;
};