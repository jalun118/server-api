const { check, validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(409).json({
      status: false,
      response: 409,
      fieldError: error.array()[0].param,
      message: error.array()[0].msg
    });
  }
  next();
};

exports.validationTeman = [
  check('no_absen', 'No absen harus diisi').notEmpty().isNumeric().withMessage('No absen harus angka'),
  check('nama', 'Nama harus diisi').notEmpty(),
];

const RegExUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g;

exports.validationFoto = [
  check('link_original_foto', 'Link Foto harus diisi').notEmpty().matches(RegExUrl).withMessage("bukan link"),
  check('judul', 'Judul harus diisi').notEmpty(),
];

exports.validationVideo = [
  check('link_original_video', 'Link Video harus diisi').notEmpty().matches(RegExUrl).withMessage("bukan link"),
  check('judul', 'Judul harus diisi').notEmpty(),
]

