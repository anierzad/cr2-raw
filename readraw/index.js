'use strict';

const bufferFile = require('./buffer-file'),
  readBuffer = require('./read-buffer'),
  dataTypes = require('./data-types');

function readraw(filePath) {

  const buffer = readBuffer(filePath);

  const ifdZeroOffset = buffer.read(4, dataTypes.types.ulong, 1);

  readIfd(ifdZeroOffset);

  function readIfd(offset) {
    const entries = buffer.read(ifdZeroOffset, dataTypes.types.ushort, 1);

    const entryLength = 12;
    const firstOffset = offset + (dataTypes.types.ushort.bytes * 1);

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
      if (entry.tagType === dataTypes.types.string.tiffType) {

        entry.actualValue = buffer.read(
          entry.tagValue,
          dataTypes.typeFor(entry.tagType),
          entry.tagCount);
      }

      // Is it the image data?
      if (entry.tagId === 273) {
        console.log('Read image data!');
      }

      console.log (entry);
    }
  }
}

module.exports = readraw;
