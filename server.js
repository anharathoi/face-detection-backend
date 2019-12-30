const express = require('express')
const app = express()
const multer = require('multer')
const multerS3 = require('multer-s3')
const fs = require('fs');
const AWS = require('aws-sdk')
const PORT = process.env.PORT || 3000

app.use(express.json())

require('dotenv').config()

const bucket = 'image-rekog-anhar' // the bucketname without s3://
const photo  = 'beard.jpeg' // the name of file

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

app.get('/', (req, res) => {
  return res.send("App is working!")
})

app.get( '/rekog', (req, res) => {
  // const client = new AWS.Rekognition(config);
  // const params = {
  //   Image: {
  //     S3Object: {
  //       Bucket: bucket,
  //       Name: photo
  //     },
  //   },
  //   Attributes: ['ALL']
  // }

  // client.detectFaces(params, (err, response) => {
  //   if (err) {
  //     return res.send(err); // an error occurred
  //   } else {
  //     console.log(`Detected faces for: ${photo}`)
  //     return res.send(response)
  //   }
  // });
})

app.get('/upload', (req, res) => {
  // const fileContent = fs.readFileSync('./2.jpg');
  // const params = {
  //   Bucket: 'image-rekog-anhar',
  //   Key: '2.jpg',
  //   Body: fileContent
  // }

  // s3.upload(params, (err, data) => {
  //   if (err) {
  //       throw err;
  //   }
  //   res.send(`File uploaded successfully. ${data.Location}`);
  // });
})

app.listen( 3000, () => {
  console.log(`Listening on port ${ PORT }`);
})
