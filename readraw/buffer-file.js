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

  function readBuffer(startPos) {

    while (startPos < buffer.byteLength) {

      let read = 16;

      if (startPos + read > buffer.byteLength) {
        read = buffer.byteLength - startPos;
      }

      var typedArray = new Uint8Array(buffer, startPos, read);

      printAsHex(typedArray);

      startPos += 16;
    }
  }

  function printAsHex(array) {
    let str = '[ ';

    for (let i = 0; i < array.length; i++) {
      str = str + ('00' + array[i].toString(16)).slice(-2);

      if (i + 1 < array.length) {
        str = str + ', ';
      }
    }

    str = str + ' ]';

    console.log(str);
  }
}

module.exports = readToArray;
