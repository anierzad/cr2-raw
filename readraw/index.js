'use strict';

const fs = require('fs'),
  path = require('path');

const dataTypes = require('../read-buffer/data-types');

function readraw(buffer) {

  const rawData = {
    ifds: {}
  };

  // Verify format.
  const canonRawMarker = buffer.read(8, dataTypes.types.string, 2);
  const canonRawVersion = buffer.read(10, dataTypes.types.ushort, 1);

  if (canonRawMarker !== 'CR'
    || canonRawVersion !== 2) {

    // It's not CR2, stop.
    return {};
  }

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

  return rawData;
}

module.exports = readraw;
