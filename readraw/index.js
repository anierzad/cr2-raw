'use strict';

const bufferFile = require('./buffer-file'),
  readBuffer = require('./read-buffer');

function readraw(filePath) {

  let buffer;

  bufferFile(filePath, (err, ab) => {
    buffer = ab;
    parse();
  });

  function parse() {

    // Read endianess.
    readBuffer.readString(buffer, 0, 2);

    // Read offset to IFD#0.
    const ifdZeroOffset = readBuffer.readLong(buffer, 2);

    readIfd(ifdZeroOffset);
  }

  function readIfd(ifdOffset) {

    const offset = ifdOffset / 2;

    const tagId = readBuffer.readShort(buffer, offset + 7);
    const tagType = readBuffer.readShort(buffer, offset + 8);
    const count = readBuffer.readLong(buffer, offset + 9);
    const tagValue = readBuffer.readShort(buffer, offset + 11);

    console.log(tagValue * 2);
  }
}

module.exports = readraw;
