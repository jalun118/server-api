module.exports = (app) => {
  const temans = require('../controllers/teman.controller');
  const router = require('express').Router();
  const { runValidation, validationTeman } = require('../Validation/Validation');

  router.get('/', temans.findAll);
  router.put('/:id', validationTeman, runValidation, temans.update);
  router.delete('/:id', temans.deleteOne);
  router.get('/:id', temans.FindOne);
  router.post('/', validationTeman, runValidation, temans.create);

  app.use('/api/teman', router);
};