'use strict';

const bufferFile = require('./buffer-file');

function readraw(filePath) {

  let buffer;

  bufferFile(filePath, (err, ab) => {
    buffer = ab;
  });
}

module.exports = readraw;
