'use strict';

const definitions = {

  ImageWidth: {
    tagId: 0x0100,
    ifd: 0,
    parse: parseInt
  },

  ImageHeight: {
    tagId: 0x0101,
    ifd: 0,
    parse: parseInt
  }
};

function fetch(raw, metaDefinition) {

  let result;
  let searchIfds = [0, 1, 2, 3];

  // IFD specified?
  if (metaDefinition.ifd !== undefined) {

    // Narrow search.
    searchIfds = [metaDefinition.ifd];
  }

  // Loop search IFDs.
  for (let ifdId in searchIfds) {

    const ifd = getIfd(raw, ifdId);
    const tag = getTag(ifd, metaDefinition.tagId);

    if (tag && tag.tagValue) {

      result = tag.tagValue;
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
