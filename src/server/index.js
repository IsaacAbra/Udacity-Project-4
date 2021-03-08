var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const url = "https://api.meaningcloud.com/sentiment-2.1?key=";
const API_KEY = process.env.API_KEY

app.use(bodyParser.urlencoded({ extended: false })); // maybe
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
dotenv.config()

app.get('/', (req, res) => {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.listen(8081, function () {
    console.log('App listening on port 8081!')
    console.log(`Your API key is ${process.env.API_KEY}`);
})

app.post("/article", async (req, res) => {

  console.log("Req", req.body.formText)
  const fullUrl = `${url}${process.env.API_KEY}&of=json&txt=${req.body.formText}&lang=en`;
  console.log("Full url", fullUrl);
  const response = await fetch(fullUrl, {method: 'POST'})

  try {
    const newData = await response.json();
    console.log("Response",newData)
    res.send(newData);
  } catch (err) {
    console.log("error", err);
  }
});
