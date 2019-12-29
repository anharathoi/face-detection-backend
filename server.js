const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
require('dotenv').config()

const AWS = require('aws-sdk')
const bucket = 'image-rekog-anhar' // the bucketname without s3://
const photo  = 'beard.jpeg' // the name of file

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const client = new AWS.Rekognition(config);
const params = {
  Image: {
    S3Object: {
      Bucket: bucket,
      Name: photo
    },
  },
  Attributes: ['ALL']
}

app.get( '/', (req, res) => {
  client.detectFaces(params, (err, response) => {
    if (err) {
      return res.send(err); // an error occurred
    } else {
      console.log(`Detected faces for: ${photo}`)
      return res.send(response)
    }
  });
})

app.listen( 3000, () => {
  console.log(`Listening on port ${ PORT }`);
})
