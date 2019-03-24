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
    parse: parseInt
  }
};

module.exports = definitions;
