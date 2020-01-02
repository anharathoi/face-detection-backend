const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const multerS3 = require('multer-s3')
const fs = require('fs');
const AWS = require('aws-sdk')
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
require('dotenv').config()

const bucket = 'image-rekog-anhar' // the bucketname without s3://

// for s3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})
const client = new AWS.Rekognition(config);

app.get('/', (req, res) => {
  return res.json({"message": "App is working!"})
})

// s3 upload
let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'image-rekog-anhar',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}${file.originalname}`)
    }
  })
})

app.post('/upload', upload.single('image'), (req, res, next) => {
  const fileName = req.file.key

  // for image rekognition face detection API
  const params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: fileName
      },
    },
    Attributes: ['ALL']
  }
  client.detectFaces(params, (err, response) => {
    if (err) {
      res.send(err); // an error occurred
    } else {
      console.log("here");
      console.log(response);
      res.status(200).json({src: req.file.location, stats: response})
    }
  });
})


app.listen( 3000, () => {
  console.log(`Listening on port ${ PORT }`);
})
