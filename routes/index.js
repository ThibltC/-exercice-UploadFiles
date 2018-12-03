var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.png`)
  }
})


const upload = multer({
  dest: 'tmp/',
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('image/png')) {
      cb(new Error('Pas png'))
    }

    cb(null, true); // tout est ok, tu continues
  }
});
// const fs = require('fs');

// doc multer npm pour changer le fichier de place



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/uploaddufichier', upload.array('monfichier', 2), (req, res, next) => {

    res.send('Fichier uploadé avec succès');

})



module.exports = router;
