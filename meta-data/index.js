'use strict';

const definitions = require('./definitions');

function fetch(raw, metaDefinition) {

  let result;
  let searchIfds = ['0', '1', '2', '3', 'exif'];

  // IFD specified?
  if (metaDefinition.ifd !== undefined) {

    // Narrow search.
    searchIfds = [metaDefinition.ifd];
  }

  // Loop search IFDs.
  for (let i = 0; i < searchIfds.length; i++) {

    const ifdId = searchIfds[i];

    const ifd = getIfd(raw, ifdId);
    const tag = getTag(ifd, metaDefinition.tagId);

    if (tag && tag.tagValue) {

      // Use tagValue by default.
      result = tag.tagValue;

      // Is it a string?
      if (metaDefinition.tagType === 2) {

        // Use actualValue instead.
        result = tag.actualValue;
      }

      break;
    }
  }

  // Do we have a result and is there a parse function?
  if (result !== undefined
    && metaDefinition.parse) {

    result = metaDefinition.parse(result);
  }

  return result;
}

function getIfd(raw, ifdId) {

  let ifd;

  if (raw.ifds && raw.ifds[ifdId]) {
    ifd = raw.ifds[ifdId];
  }

  return ifd;
}

function getTag(ifd, tagId) {

  let tag;

  if (ifd && ifd[tagId]) {
    tag = ifd[tagId];
  }

  return tag;
}

module.exports = {
  definitions: definitions,
  fetch: fetch
};
