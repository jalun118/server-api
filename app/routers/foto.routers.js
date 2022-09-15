module.exports = (app) => {
  const fotos = require('../controllers/foto.controller');
  const router = require('express').Router();
  const { runValidation, validationFoto } = require('../Validation/Validation')

  router.get('/', fotos.findAll);
  router.post('/', validationFoto, runValidation, fotos.create);
  router.put('/:id', validationFoto, runValidation, fotos.update);
  router.get('/:id', fotos.FindOne);
  router.delete('/:id', fotos.deleteOne)
  // router.delete('/', fotos.deleteAll)

  app.use('/api/foto', router);
}