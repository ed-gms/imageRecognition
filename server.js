const express = require('express')
const app = express()
const port = process.argv[2] || 8080
const bodyParser = require('body-parser')
const vision = require('@google-cloud/vision');

app.use(bodyParser.json())

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: './img_key.json'
});

const fileName = './images/test-img3.jpg';

app.get('/', (req, res) => {
  // res.send('this endpoint works!')

  // Performs label detection on the image file
  client
    .labelDetection(fileName)
    .then(results => {
      const labels = results[0].labelAnnotations;
      console.log('Labels:');
      labels.forEach(label => console.log(label));
      res.json(results)
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
})

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`)
})