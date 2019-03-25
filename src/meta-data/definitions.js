'use strict';

const definitions = {

  ImageWidth: {
    tagId: 0xa002,
    tagType: 4,
    ifd: 'exif',
    parse: parseInt
  },

  ImageHeight: {
    tagId: 0xa003,
    tagType: 4,
    ifd: 'exif',
    parse: parseInt
  },

  DateTaken: {
    tagId: 0x9003,
    tagType: 2,
    ifd: 'exif',
    parse: parseExifDate
  }
};

function parseExifDate(result) {

  let parsed;

  if (!result) {
    return undefined;
  }

  const dateTimeSplit = result.split(' ');

  if (dateTimeSplit.length !== 2) {
    return undefined;
  }

  const dateSplit = dateTimeSplit[0].split(':');
  const timeSplit = dateTimeSplit[1].split(':');

  if (dateSplit.length !== 3
    || timeSplit.length !== 3) {
    return undefined;
  }

  parsed = new Date(
    dateSplit[0],
    parseInt(dateSplit[1]) - 1,
    dateSplit[2],
    timeSplit[0],
    timeSplit[1],
    timeSplit[2]
  );

  return parsed;
}

module.exports = definitions;
