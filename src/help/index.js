const tf = require('@tensorflow/tfjs-node');
const jpeg = require('jpeg-js');

const readImage = (buf) => {
  const pixels = jpeg.decode(buf, true)
  return pixels
}

const imageByteArray = (image, numChannels) => {
  const pixels = image.data
  const numPixels = image.width * image.height;
  const values = new Int32Array(numPixels * numChannels);

  for (let i = 0; i < numPixels; i++) {
    for (let channel = 0; channel < numChannels; ++channel) {
      values[i * numChannels + channel] = pixels[i * 4 + channel];
    }
  }

  return values
}

const imageToInput = (img, numChannels) => {
  return new Promise((res) => {
    const image = readImage(img)
    const values = imageByteArray(image, numChannels)
    const outShape = [image.height, image.width, numChannels] ;
    const input = tf.tensor3d(values, outShape, 'int32');
    return res(input);
  })


}

const jsonResponse = (response, data) => {
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.write(JSON.stringify(data, null, 2));
  return response.end();
}

const badRequest = (response, err) => {
  response.writeHead(400, {'Content-Type': 'application/json'});
  response.write(JSON.stringify({
    message: 'Bad request',
    err: err.message
  }, null, 2));
  return response.end();
}

module.exports = { imageToInput, badRequest, jsonResponse };
