'use stict';

const fs = require('fs');

function init(filePath) {

  let data;

  // Read entire file.
  data = fs.readFileSync(filePath);

  function read(offset, type, count) {

    const arrayBuffer = fillBuffer(offset, type.bytes * count);

    let value = type.getValue(arrayBuffer);

    return value;
  }

  function copy(offset, count) {

    let newData = [];

    for (let i = 0, p = offset; i < count; i++, p++) {
      newData[i] = data[p];
    }

    return newData;
  }

  function fillBuffer(offset, size) {

    const arrayBuffer = new ArrayBuffer(size);

    let ta = new Uint8Array(arrayBuffer);

    for (let i = 0; i < ta.length; i++) {
      ta[i] = data[offset + i];
    }

    return arrayBuffer;
  }

  return {
    read: read,
    copy: copy
  }
}

module.exports = init;
