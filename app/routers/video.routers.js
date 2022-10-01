module.exports = (app) => {
  const videos = require('../controllers/video.controller');
  const router = require('express').Router();
  const { runValidation, validationVideo } = require('../Validation/Validation')

  router.get('/', videos.findAll);
  router.post('/', validationVideo, runValidation, videos.create);
  router.get('/:id', videos.FindOne);
  router.put('/:id', videos.update);
  router.delete('/:id', videos.deleteOne);

  app.use('/api/video', router);
}
