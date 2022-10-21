const db = require('../models');
const Video = db.videos;

exports.findAll = (req, res) => {
  Video.find()
    .then((result) => {
      const Result = result
        .filter(data => data.createdAt)
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(({ id, id_video, link_thumb, link_video, link_download_video, link_original_video, judul, deskripsi, createdAt, updatedAt }) => ({
          id,
          id_video,
          link_thumb,
          link_video,
          link_download_video,
          link_original_video,
          judul,
          deskripsi,
          createdAt,
          updatedAt
        }));
      res.status(200).send({
        response: 200,
        status: true,
        Result
      })
    }).catch((err) => {
      res.status(409).send({
        response: 409,
        status: false,
        message: err || "error cuy"
      })
    });
}

exports.create = async (req, res) => {
  const { link_original_video, judul, deskripsi } = req.body;

  let Vd = new URL(link_original_video);
  // let paramVd = (new URL(link_original_video)).searchParams;
  let UrlArray = Vd.pathname.split('/');

  if ((Vd.hostname !== 'drive.google.com') && (UrlArray[1] === 'uc' || 'thumbnail')) {
    return res.status(400).send({
      response: 409,
      status: false,
      fieldError: "link_original_video",
      message: "link gak valid cuy"
    })
  }

  let linkVideo = await Video.findOne({ link_original_video: link_original_video });

  if (linkVideo) {
    return res.status(409).send({
      response: 409,
      fieldError: "link_original_video",
      status: false,
      message: "link sudah ada"
    })
  }

  const ThumbProtocol = "https://lh3.googleusercontent.com/d/";

  const video = new Video({
    id_video: UrlArray[3],
    link_thumb: ThumbProtocol + UrlArray[3] + "=w300-k-nu-iv1",
    link_video: Vd.protocol + "//" + Vd.hostname + '/uc?id=' + UrlArray[3],
    link_download_video: Vd.protocol + "//" + Vd.hostname + '/uc?id=' + UrlArray[3] + "&export=download",
    link_original_video: link_original_video,
    judul: judul,
    deskripsi: deskripsi ? deskripsi : null,
  });

  video.save(video)
    .then((result) => {
      res.status(200).send({
        response: 200,
        status: true,
        result
      });
    }).catch((err) => {
      res.status(409).send({
        response: 409,
        status: false,
        message: err.message || "gagal cuy, cek ulang internetnya "
      });
    });
}


exports.update = async (req, res) => {
  const id = req.params.id;

  const { link_original_video, judul, deskripsi } = req.body;

  let Vd = new URL(link_original_video);
  // let paramVd = (new URL(link_original_video)).searchParams;
  let UrlArray = Vd.pathname.split('/');

  if ((Vd.hostname !== 'drive.google.com') && (UrlArray[1] === 'uc' || 'thumbnail')) {
    return res.status(400).send({
      status: false,
      response: 400,
      fieldError: "link_original_video",
      message: "link tidak valid"
    })
  }

  let linkVideo = await Video.findOne({ link_original_video: link_original_video });

  if (linkVideo) {
    return res.status(409).send({
      response: 409,
      fieldError: "link_original_video",
      status: false,
      message: "link sudah ada"
    })
  }

  const ThumbProtocol = "https://lh3.googleusercontent.com/d/";

  Video.findByIdAndUpdate(id, {
    id_video: UrlArray[3],
    link_thumb: ThumbProtocol + UrlArray[3] + "=w300-k-nu-iv1",
    link_video: Vd.protocol + "//" + Vd.hostname + '/uc?id=' + UrlArray[3],
    link_download_video: Vd.protocol + "//" + Vd.hostname + '/uc?id=' + UrlArray[3] + "&export=download",
    link_original_video: link_original_video,
    judul: judul,
    deskripsi: deskripsi ? deskripsi : null,
  })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          response: 404,
          status: false,
          message: "data kosong"
        })
      }

      res.status(200).send({
        status: true,
        response: 200,
        message: "Berhasil cuy"
      })
    }).catch((err) => {
      res.status(409).send({
        status: false,
        response: 409,
        message: err.message || "gagal mengubah"
      })
    });
}

exports.FindOne = (req, res) => {
  const id = req.params.id;

  Video.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          response: 404,
          status: false,
          message: "Data tidak ditemukan"
        })
      }

      res.status(200).send({
        response: 200,
        status: true,
        result
      });
    }).catch((err) => {
      res.status(404).send({
        response: 404,
        status: false,
        message: err.message || "gagal cuy, gak ada datanya"
      })
    });
}

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Video.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          response: 404,
          status: false,
          message: "data kosong"
        })
      }

      res.status(200).send({
        response: 200,
        status: true,
        message: "Berhasil di hapus cuy"
      })
    }).catch((err) => {
      res.status(409).send({
        response: 409,
        status: false,
        message: err.message || "gagal menghapus"
      })
    });
}
