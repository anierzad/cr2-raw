'use stict';

const fs = require('fs');

const dataTypes = require('./data-types'),
  utils = require('./utils');

function init(filePath) {

  let data;

  // Read entire file.
  data = fs.readFileSync(filePath);

  function read(offset, type, count) {

    const arrayBuffer = fillBuffer(offset, type.bytes * count);

    let value = type.getValue(arrayBuffer);

    return value;
  }

  function fillBuffer(offset, size) {

    const arrayBuffer = new ArrayBuffer(size);

    let ta = new Uint8Array(arrayBuffer);

    for (let i = 0; i < ta.length; i++) {
      ta[i] = data[offset + i];
    }

    utils.arrayAsHex(ta);

    return arrayBuffer;
  }

  return {
    read: read
  }
}

module.exports = init;
