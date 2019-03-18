const tf = require('@tensorflow/tfjs-node');
const nsfwjs = require('./../lib/nsfwjs');
const http = require('http')
const { imageToInput, badRequest, jsonResponse } = require('./help')
const port = 3030

const load = () => nsfwjs.load('file://./src/model/nsfwjs/');

const requestPredict = (model) => (request, response) => {
  const bufs = [];
  request.on('data', chunk => bufs.push(chunk));
  request.on('end', () => {
    imageToInput(Buffer.concat(bufs), 3)
      .then(image => model.classify(image))
      .then(p => jsonResponse(response, p)).catch(err => badRequest(response, err));
  });
}

const runService = (model) => {
  const server = http.createServer(requestPredict(model))
  server.listen(port, (err) => {
    if (err) return console.log(err)
    console.log(`server is listening on ${port}`)
  });
}

load().then(runService);
