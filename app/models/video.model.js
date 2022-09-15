module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      id_video: String,
      link_thumb: String,
      link_video: String,
      link_download_video: String,
      link_original_video: String,
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

  const Video = mongoose.model("video", schema);
  return Video;
}