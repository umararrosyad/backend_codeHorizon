const path = require('path');
const multer = require('multer');

const uploadFolder = path.join(__dirname, '..', 'public');

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        cb(null, uploadFolder); // Simpan file di folder 'uploads/'
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +'-'+ file.originalname);
    }
  });

const upload = multer({ storage: storage });

module.exports = upload