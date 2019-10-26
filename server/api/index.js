const cors = require('cors');
const path = require('path');
const uuid = require('uuid-v4');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const STORAGE_DIR = path.resolve(__dirname, '../files');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, STORAGE_DIR);
  },
  filename: (req, file, callback) => {
    console.log(file);
    file.id = uuid();
    const info = getFileInfo(req)(file);
    const filename = `${info.id}.${info.ext}`;
    callback(null, filename);
  },
});

const upload = multer({ storage }).array('filefield', 100);

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(STORAGE_DIR));
app.use(cors());

app.use('*', (req, res, next) => {
  req.timestamp = `${Date.now()}`;
  next();
});

app.get('/', (req, res) => {
  res.json({
    hello: 'world',
    ahhh: 'yeah',
  });
});

app.post('/upload', (req, res, err) => {
  processFiles(req, res);
});

// app.listen(8000);
// console.log('listening on 8000');

module.exports = app;
