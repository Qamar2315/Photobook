const multer= require('multer');

//declaring multer storage
var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, 'C:/Users/Dell/OneDrive/Desktop/qamar/Projects/PhotoBook/public/uploads');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , Date.now() + '.jpg');   
  }
});

module.exports.upload = multer({
  storage: storage,
  limits : {fileSize : 1000000}
});