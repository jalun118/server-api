const dbConfig = require('../../config/db.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose
db.url = dbConfig.url
db.temans = require('./teman.model')(mongoose)
db.fotos = require('./foto.model')(mongoose)
db.videos = require('./video.model')(mongoose)

module.exports = db