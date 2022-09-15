const db = require('../models/');
const Teman = db.temans;

exports.findAll = (req, res) => {
  Teman.find()
    .then((result) => {
      const Result = result
        .filter(data => data.no_absen)
        .sort((a, b) => a.no_absen - b.no_absen)
        .map(({ id, no_absen, nama, kelas, pangkat, createdAt, updatedAt }) => ({
          id,
          no_absen,
          nama,
          kelas,
          pangkat,
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
  const { no_absen, nama, kelas, pangkat } = req.body;

  let NoAbsen = await Teman.findOne({ no_absen: no_absen });
  let Nama = await Teman.findOne({ nama: nama });

  if (NoAbsen) {
    return res.status(409).send({
      condition: false,
      message: "No absen sudah ada"
    })
  }

  if (Nama) {
    return res.status(409).send({
      condition: false,
      message: "nama sudah ada"
    })
  }

  const teman = new Teman({
    no_absen: no_absen,
    nama: nama,
    kelas: kelas ? kelas : null,
    pangkat: pangkat ? pangkat : null
  });

  teman.save(teman)
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

exports.FindOne = (req, res) => {
  const id = req.params.id;

  Teman.findById(id)
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
    });;
}

exports.update = async (req, res, next) => {
  const id = req.params.id;

  Teman.findByIdAndUpdate(id, req.body)
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

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Teman.findByIdAndRemove(id)
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
  Teman.remove()
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