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

  function readRaw(offset, count) {

    let newData = [];
    let pos = 0;

    for (let i = offset; i < offset + count; i++) {
      newData[pos] = data[i];
      pos++;
    }

    return newData;
  }

  function fillBuffer(offset, size) {

    const arrayBuffer = new ArrayBuffer(size);

    let ta = new Uint8Array(arrayBuffer);

    for (let i = 0; i < ta.length; i++) {
      ta[i] = data[offset + i];
    }

    //utils.arrayAsHex(ta);

    return arrayBuffer;
  }

  return {
    read: read,
    readRaw: readRaw
  }
}

module.exports = init;
