'use strict';

const fs = require('fs'),
  path = require('path');

const readraw = require('./src/readraw'),
  readBuffer = require('./src/read-buffer'),
  dataTypes = require('./src/read-buffer/data-types'),
  metaData = require('./src/meta-data');

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

    let ifd;

    // Retrieve relevant ifd.
    if (raw.ifds) {

      ifd = raw.ifds[0];
    }

    // Retrieve offset.
    if (ifd && ifd[stripOffsetTag]) {

      offset = ifd[stripOffsetTag].tagValue;
    }

    // Retrieve length.
    if (ifd && ifd[stripByteCountsTag]) {

      length = ifd[stripByteCountsTag].tagValue;
    }

    // Have offset and length?
    if (!offset || !length) {

      return null;
    }

    const imgData = buffer.copy(offset, length);

    return Buffer.from(imgData);
  }

  // Retrieve the image thumbnail.
  function thumbnailImage() {

    const stripOffsetTag = 0x0201;
    const stripByteCountsTag = 0x0202;

    let offset;
    let length;

    let ifd;

    // Retrieve relevant ifd.
    if (raw.ifds) {

      ifd = raw.ifds[1];
    }

    // Retrieve offset.
    if (ifd && ifd[stripOffsetTag]) {

      offset = ifd[stripOffsetTag].tagValue;
    }

    // Retrieve length.
    if (ifd && ifd[stripByteCountsTag]) {

      length = ifd[stripByteCountsTag].tagValue;
    }

    // Have offset and length?
    if (!offset || !length) {

      return null;
    }

    const imgData = buffer.copy(offset, length);

    return Buffer.from(imgData);
  }

  function fetchMeta(metaDefinition) {

    return metaData.fetch(raw, metaDefinition);
  }

  return {
    previewImage: previewImage,
    thumbnailImage: thumbnailImage,
    fetchMeta: fetchMeta
  };
}

init.meta = metaData.definitions;

module.exports = init;
