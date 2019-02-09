'use strict';

const fs = require('fs'),
  path = require('path');

const bufferFile = require('./buffer-file'),
  readBuffer = require('./read-buffer'),
  dataTypes = require('./data-types');

function readraw(filePath) {

  const rawData = {
    ifds: {

    }
  };

  const buffer = readBuffer(filePath);

  // Get offset to IFD#0;
  let ifdOffset = buffer.read(4, dataTypes.types.ulong, 1);
  let ifdCount = 0;

  // Read IFD#0 and get address of IFD#1;
  ifdOffset = readIfd(ifdOffset, ifdCount);
  ifdCount++;

  // Read IFD#1 and get address of IFD#2;
  ifdOffset = readIfd(ifdOffset, ifdCount);
  ifdCount++;

  // Read IFD#2 and get address of IFD#3;
  ifdOffset = readIfd(ifdOffset, ifdCount);
  ifdCount++;

  // Read IFD#3.
  ifdOffset = readIfd(ifdOffset, ifdCount);

  function readIfd(offset, number) {

    const ifdData = {};

    // Read number of entries in this IFD.
    const entries = buffer.read(offset, dataTypes.types.ushort, 1);

    // We know each entry is 12 bytes long.
    const entryLength = 12;

    // Find the first offset by adding what we've already read.
    const firstOffset = offset + (dataTypes.types.ushort.bytes * 1);

    // Read the address of the next IFD.
    const nextIfd = buffer.read(firstOffset + (entries * 12), dataTypes.types.ulong, 1);

    for (let i = 0; i < entries; i++) {

      const entry = {};

      // Work out the offset of the start of this entry.
      const entryOffset = firstOffset + (entryLength * i);
      let readOffset = 0;

      // Read Tag_id.
      entry.tagId = buffer.read(
        entryOffset,
        dataTypes.types.ushort,
        1);

      // Move on.
      readOffset += dataTypes.types.ushort.bytes;

      // Read Tag_type.
      entry.tagType = buffer.read(
        entryOffset + readOffset,
        dataTypes.types.ushort,
        1);
      readOffset += dataTypes.types.ushort.bytes;

      // Read count.
      entry.tagCount = buffer.read(
        entryOffset + readOffset,
        dataTypes.types.ulong,
        1);
      readOffset += dataTypes.types.ulong.bytes;

      // Read Tag_value.
      entry.tagValue = buffer.read(
        entryOffset + readOffset,
        dataTypes.types.ulong,
        1);
      readOffset += dataTypes.types.ulong.bytes;

      // If it's a string type.
      if (entry.tagType === dataTypes.types.string.tiffType) {
        entry.actualValue = buffer.read(
          entry.tagValue,
          dataTypes.typeFor(entry.tagType),
          entry.tagCount);
      }

      ifdData['' + entry.tagId] = entry;
    }

    rawData.ifds['' + number] = ifdData;

    return nextIfd;
  }

  function getPreview() {

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

  return {
    getPreview: getPreview
  }
}

module.exports = readraw;
