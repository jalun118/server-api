const db = require('../models');
const Foto = db.fotos;

exports.findAll = (req, res) => {
  Foto.find()
    .then((result) => {
      const Result = result
        .filter(data => data.createdAt)
        .sort((a, b) => b.createdAt - a.createdAt);
      res.status(200).send({
        response: 200,
        status: true,
        Result
      });
    }).catch((err) => {
      res.status(409).send({
        status: false,
        fieldError: "Foto",
        response: 409,
        message: err || "error cuy"
      });
    });
};

exports.FindPages = (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perpage || 5;
  let totalItem;

  Foto.find()
    .countDocuments()
    .then(count => {
      totalItem = count;
      return Foto.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(result => {
      res.status(200).send({
        response: 200,
        status: true,
        result: result,
        per_page: perPage,
        current_page: currentPage,
        All_data: totalItem,
      });
    })
    .catch((err) => {
      res.status(409).send({
        status: false,
        fieldError: "Foto",
        response: 409,
        message: err || "error cuy"
      });
    });
};

exports.create = async (req, res) => {
  const { link_original_foto, judul, deskripsi } = req.body;
  const ft = new URL(link_original_foto);
  const UrlArray = ft.pathname.split('/');

  if ((ft.hostname !== 'drive.google.com') && (UrlArray[1] === 'uc' || 'thumbnail')) {
    return res.status(400).send({
      status: false,
      fieldError: "link_original_foto",
      response: 400,
      message: "Link tidak valid cuy"
    });
  }

  const linkFoto = await Foto.findOne({ link_original_foto: link_original_foto });

  if (linkFoto) {
    return res.status(400).send({
      status: false,
      response: 400,
      fieldError: "link_original_foto",
      message: "Link sudah sudah ada"
    });
  }

  const foto = new Foto({
    id_foto: UrlArray[3],
    link_foto: ft.protocol + "//" + ft.hostname + "/uc?id=" + UrlArray[3],
    link_download_foto: ft.protocol + "//" + ft.hostname + '/uc?id=' + UrlArray[3] + "&export=download",
    link_original_foto: link_original_foto,
    judul: judul,
    deskripsi: deskripsi ? deskripsi : null,
  });

  foto.save(foto)
    .then((result) => {
      res.status(200).send({
        status: true,
        response: 200,
        result
      });
    }).catch((err) => {
      res.status(409).send({
        status: false,
        fieldError: "Foto",
        response: 409,
        message: err.message || "gagal cuy, cek ulang internetnya "
      });
    });
};


exports.update = async (req, res) => {
  const id = req.params.id;

  const { link_original_foto, judul, deskripsi } = req.body;

  const ft = new URL(link_original_foto);
  const UrlArray = ft.pathname.split('/');

  if ((ft.hostname !== 'drive.google.com') && (UrlArray[1] === 'uc' || 'thumbnail')) {
    res.status(400).send({
      status: false,
      fieldError: "link_original_foto",
      response: 400,
      message: "Link tidak valid"
    });
  }

  Foto.findByIdAndUpdate(id, {
    id_foto: UrlArray[3],
    link_foto: ft.protocol + "//" + ft.hostname + "/uc?id=" + UrlArray[3],
    link_download_foto: ft.protocol + "//" + ft.hostname + '/uc?id=' + UrlArray[3] + "&export=download",
    link_original_foto: link_original_foto,
    judul: judul,
    deskripsi: deskripsi ? deskripsi : null,
  })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          response: 404,
          status: false,
          message: "data kosong"
        });
      }

      res.status(200).send({
        response: 200,
        status: true,
        message: "Berhasil cuy"
      });
    }).catch((err) => {
      res.status(409).send({
        response: 409,
        status: false,
        message: err.message || "gagal mengubah"
      });
    });
};

exports.FindOne = (req, res) => {
  const id = req.params.id;

  Foto.findById(id)
    .then((result) => {
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
      });
    });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Foto.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          response: 404,
          status: false,
          message: "data kosong"
        });
      }

      res.status(200).send({
        response: 200,
        status: true,
        message: "Berhasil di hapus cuy"
      });
    }).catch((err) => {
      res.status(409).send({
        response: 409,
        status: false,
        message: err.message || "gagal menghapus"
      });
    });
};

exports.deleteAll = (req, res) => {
  Foto.remove()
    .then(() => {
      res.status(200).send({
        response: 200,
        status: true,
        message: "Berhasil di hapus cuy"
      });
    }).catch((err) => {
      res.status(409).send({
        response: 400,
        status: false,
        message: err.message || "gagal menghapus"
      });
    });
};