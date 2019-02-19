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
    const stripByteCountsTag = 0x0117;

    let offset;
    let length;

    if (raw.ifds[0]
      && raw.ifds[0][stripOffsetTag]) {

      offset = raw.ifds[0][stripOffsetTag].tagValue;
    }

    if (raw.ifds[0]
      && raw.ifds[0][stripByteCountsTag]) {

      length = raw.ifds[0][stripByteCountsTag].tagValue;
    }

    if (!offset || !length) {
      return null;
    }

    const imgData = buffer.copy(offset, length);

    return Buffer.from(imgData);
  }

  return {
    previewImage: previewImage
  };
}

module.exports = init;
