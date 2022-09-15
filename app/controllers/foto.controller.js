const db = require('../models');
const Foto = db.fotos;

exports.findAll = (req, res) => {
  Foto.find()
    .then((result) => {
      const Result = result
        .filter(data => data.createdAt)
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(({ id, id_foto, link_foto, link_download_foto, link_original_foto, judul, deskripsi, createdAt, updatedAt }) => ({
          id,
          id_foto,
          link_foto,
          link_download_foto,
          link_original_foto,
          judul,
          deskripsi,
          createdAt,
          updatedAt
        }));
      res.send({
        condition: true,
        Result
      })
    }).catch((err) => {
      res.status(409).send({
        condition: false,
        message: err || "error cuy"
      })
    });
}

exports.create = async (req, res) => {
  const { link_original_foto, judul, deskripsi } = req.body;

  let ft = new URL(link_original_foto);
  let paramFt = (new URL(link_original_foto)).searchParams;
  let UrlArray = ft.pathname.split('/');

  if ((ft.hostname !== 'drive.google.com') && (UrlArray[1] === 'uc' || 'thumbnail')) {
    return res.send({
      message: "link gak valid cuy"
    })
  }

  let linkFoto = await Teman.findOne({ link_original_foto: link_original_foto });

  if (linkFoto) {
    return res.status(409).send({
      condition: false,
      message: "Link sudah sudah ada"
    })
  }

  const foto = new Foto({
    id_foto: UrlArray[3],
    link_foto: ft.protocol + "//" + ft.hostname + '/thumbnail?id=' + UrlArray[3],
    link_download_foto: ft.protocol + "//" + ft.hostname + '/uc?id=' + UrlArray[3] + "&export=download",
    link_original_foto: link_original_foto,
    judul: judul,
    deskripsi: deskripsi ? deskripsi : null,
  });

  foto.save(foto)
    .then((result) => {
      res.send({
        condition: true,
        result
      });
    }).catch((err) => {
      res.status(409).send({
        condition: false,
        message: err.message || "gagal cuy, cek ulang internetnya "
      });
    });
}


exports.update = async (req, res) => {
  const id = req.params.id;

  const { link_original_foto, judul, deskripsi } = req.body;

  let ft = new URL(link_original_foto);
  let paramFt = (new URL(link_original_foto)).searchParams;
  let UrlArray = ft.pathname.split('/');

  if ((ft.hostname !== 'drive.google.com') && (UrlArray[1] === 'uc' || 'thumbnail')) {
    res.send({
      message: "link gak valid cuy"
    })
  }

  Foto.findByIdAndUpdate(id, {
    id_foto: UrlArray[3],
    link_foto: ft.protocol + "//" + ft.hostname + '/thumbnail?id=' + UrlArray[3],
    link_download_foto: ft.protocol + "//" + ft.hostname + '/uc?id=' + UrlArray[3] + "&export=download",
    link_original_foto: link_original_foto,
    judul: judul,
    deskripsi: deskripsi ? deskripsi : null,
  })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          condition: false,
          message: "data kosong"
        })
      }

      res.send({
        condition: true,
        message: "Berhasil cuy"
      })
    }).catch((err) => {
      res.status(409).send({
        condition: false,
        message: err.message || "gagal mengubah"
      })
    });
}

exports.FindOne = (req, res) => {
  const id = req.params.id;

  Foto.findById(id)
    .then((result) => {
      res.send({
        condition: true,
        result
      });
    }).catch((err) => {
      res.status(404).send({
        condition: false,
        message: err.message || "gagal cuy, gak ada datanya"
      })
    });
}

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Foto.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          condition: false,
          message: "data kosong"
        })
      }

      res.send({
        condition: true,
        message: "Berhasil di hapus cuy"
      })
    }).catch((err) => {
      res.status(409).send({
        condition: false,
        message: err.message || "gagal menghapus"
      })
    });
}

exports.deleteAll = (req, res) => {
  Foto.remove()
    .then((result) => {
      res.send({
        condition: true,
        message: "Berhasil di hapus cuy"
      })
    }).catch((err) => {
      res.status(409).send({
        condition: false,
        message: err.message || "gagal menghapus"
      })
    });
}