const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
app.use(cors());

const emailService = require('./service.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
  	try {
	  	let mimetype = file.mimetype;
	  	let flag = mimetype.split('/');
	  	flag = flag[1];
	  	let date = Date.now();
	  	let tmpFile = date + '.' + flag;
	  	req.body.filePath = `/uploads/${tmpFile}`;
	  	req.body.fileName = tmpFile;
	    // cb(null, file.originalname);
	    cb(null, tmpFile);
  	} catch(e) {
  		console.log('Error While file upload');
  	}
  }
});
 
const upload = multer({ storage: storage });

app.post('/send-file', upload.single('image'), (req, res) => {
	try {
		emailService(req.body.fileName);
	} catch(e) {
		console.log('Error while call send mail function');
	}
});

app.listen(4000, () => {
	console.log('server is ready on port 4000');
});