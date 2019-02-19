'use strict';

const fs = require('fs');

function readToArray(filePath, callback) {

  let buffer;
  let data;

  // Read entire file.
  data = fs.readFileSync(filePath);

  // Create a new buffer with the appropriate size.
  buffer = new ArrayBuffer(data.length);

  // Create typed array to write to buffer.
  let ta = new Int8Array(buffer);

  // Loop over data in file and place in buffer.
  for (let i = 0; i < data.length; i++) {
    ta[i] = data[i];
  }

  // Return the populated buffer.
  callback(null, buffer);
}

module.exports = readToArray;
