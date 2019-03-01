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

    const ifd = raw.ifds[0];

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

    const ifd = raw.ifds[1];

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

  function unk1Image() {

    const stripOffsetTag = 0x0111;
    const stripByteCountsTag = 0x0117;

    let offset;
    let length;

    const ifd = raw.ifds[2];

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

  function unk2Image() {

    const stripOffsetTag = 0x0111;
    const stripByteCountsTag = 0x0117;

    let offset;
    let length;

    const ifd = raw.ifds[3];

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

  return {
    previewImage: previewImage,
    thumbnailImage: thumbnailImage,
    unk1Image: unk1Image,
    unk2Image: unk2Image
  };
}

module.exports = init;
