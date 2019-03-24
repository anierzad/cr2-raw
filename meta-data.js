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

module.exports = {
  definitions: definitions
};
