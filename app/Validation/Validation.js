const { check, validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(409).json({
      status: false,
      message: error.array()[0].msg
    });
  }
  next();
}

exports.validationTeman = [
  check('no_absen', 'No absen harus diisi').notEmpty().isNumeric().withMessage('No absen harus angka'),
  check('kelas', 'Nama harus diisi').notEmpty(),
]

exports.validationFoto = [
  check('link_original_foto', 'Link Foto harus diisi').notEmpty(),
  check('judul', 'Judul harus diisi').notEmpty(),
]

exports.validationVideo = [
  check('link_original_video', 'video Foto harus diisi').notEmpty(),
  check('judul', 'Judul harus diisi').notEmpty(),
]

