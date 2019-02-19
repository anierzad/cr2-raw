'use strict';

const fs = require('fs'),
  path = require('path');

const readraw = require('./readraw');

// Get the path of the file.
const filePath = path.resolve('test.CR2');

const raw = readraw(filePath);

// Retrieves the preview image data.
function previewImage() {

  const stripOffsetTag = 0x0111;

  let offset;

  if (rawData.ifds[0]
    && rawData.ifds[0][stripOffsetTag]
    && rawData.ifds[0][stripOffsetTag].tagValue) {

    offset = rawData.ifds[0][stripOffsetTag].tagValue;
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

module.exports = {
  previewImage: previewImage
};
