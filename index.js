const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = require("./app/models/");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database conected success`);
  }).catch((err) => {
    console.log(`Database not connect`, err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({
    message: "Welcome To my server abal-abal"
  });
});

const endToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403)
  }
}

require('./app/routers/teman.routers')(app);
require('./app/routers/foto.routers')(app);
require('./app/routers/video.routers')(app);

const PORT = 3001

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/`);
});