'use strict';

const fs = require('fs'),
  path = require('path'),
  sharp = require('sharp');

const bufferFile = require('./buffer-file'),
  readBuffer = require('./read-buffer'),
  dataTypes = require('./data-types');

function readraw(filePath) {

  const buffer = readBuffer(filePath);

  const ifdZeroOffset = buffer.read(4, dataTypes.types.ulong, 1);

  let next = readIfd(ifdZeroOffset);

  if (next) {
    next = readIfd(next);
  }

  function readIfd(offset) {
    console.log('');
    console.log('Reading at: ' + offset);

    const entries = buffer.read(ifdZeroOffset, dataTypes.types.ushort, 1);

    const entryLength = 12;
    const firstOffset = offset + (dataTypes.types.ushort.bytes * 1);

    let nextIfd = buffer.read(firstOffset + (entries * 12), dataTypes.types.ulong, 1);

    let imgDataStart;
    let imgDataLength;

    for (let i = 0; i < entries; i++) {
      const entry = {};

      const entryOffset = firstOffset + (entryLength * i);
      let readOffset = 0;

      entry.tagId = buffer.read(
        entryOffset,
        dataTypes.types.ushort,
        1);
      readOffset += 2;

      entry.tagType = buffer.read(
        entryOffset + readOffset,
        dataTypes.types.ushort,
        1);
      readOffset += 2;

      entry.tagCount = buffer.read(
        entryOffset + readOffset,
        dataTypes.types.ulong,
        1);
      readOffset += 4;

      entry.tagValue = buffer.read(
        entryOffset + readOffset,
        dataTypes.types.ulong,
        1);
      readOffset += 4;

      // If it's a string type.
      // if (entry.tagType === dataTypes.types.string.tiffType) {

      //   entry.actualValue = buffer.read(
      //     entry.tagValue,
      //     dataTypes.typeFor(entry.tagType),
      //     entry.tagCount);
      // }

      // // Is it the image data?
      // if (entry.tagId === 273) {
      //   console.log('Read image data!');
      // }

      if (entry.tagId === 513) {
        imgDataStart = entry.tagValue;
      }

      if (entry.tagId === 514) {
        imgDataLength = entry.tagValue;
      }

      console.log (entry);
    }

    if (imgDataStart && imgDataLength) {
      const newData = buffer.readRaw(imgDataStart, imgDataLength);

      sharp(Buffer.from(newData))
        .toFile('test.jpg');
    }

    return nextIfd;
  }
}

module.exports = readraw;
