'use strict';

const fs = require('fs'),
  path = require('path');

const readraw = require('./readraw'),
  readBuffer = require('./read-buffer'),
  dataTypes = require('./read-buffer/data-types');

function init(filePath) {

  const buffer = readBuffer(filePath);

  // Read raw data.
  const raw = readraw(buffer);

  // Retrieves the preview image data.
  function previewImage() {

    const stripOffsetTag = 0x0111;

    let offset;

    if (raw.ifds[0]
      && raw.ifds[0][stripOffsetTag]
      && raw.ifds[0][stripOffsetTag].tagValue) {

      offset = raw.ifds[0][stripOffsetTag].tagValue;
    }

    if (!offset) {
      return null;
    }

    let end;
    let testPos = offset;

    while (!end) {

      const testA = buffer.read(testPos, dataTypes.types.ubyte, 1);
      const testB = buffer.read(testPos + 1, dataTypes.types.ubyte, 1);

      if (testA === 0xff && testB === 0xd9) {

        end = testPos;
        break;
      }

      testPos++;
    }

    end = end + 2;

    const imgData = buffer.copy(offset, end - offset);

    return Buffer.from(imgData);
  }

  return {
    previewImage: previewImage
  };
}

module.exports = init;
