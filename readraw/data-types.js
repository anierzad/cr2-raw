'use strict';

const types = {

  ubyte: {
    tiffType: 1,
    bytes: 1,
    getValue: (arrayBuffer) => {
      const array = new Uint8Array(arrayBuffer);

      return array[0];
    }
  },

  string: {
    tiffType: 2,
    bytes: 1,
    getValue: (arrayBuffer) => {
      const array = new Uint8Array(arrayBuffer);

      let str = '';

      for (let i = 0; i < array.length; i++) {

        // No nulls.
        if (array[i] !== 0) {
          str += String.fromCharCode(array[i]);
        }
      }

      return str;
    }
  },

  ushort: {
    tiffType: 3,
    bytes: 2,
    getValue: (arrayBuffer) => {
      const array = new Uint16Array(arrayBuffer);
      //console.log(array[0]);
      return array[0];
    }
  },

  ulong: {
    tiffType: 4,
    bytes: 4,
    getValue: (arrayBuffer) => {
      const array = new Uint32Array(arrayBuffer);
      //console.log(array[0]);
      return array[0];
    }
  },
};

function typeFor(typeId) {

  let type;

  for (let prop in types) {
    if (types[prop].tiffType === typeId) {
      type = types[prop];
    }
  }

  return type;
}

module.exports = {
  types: types,
  typeFor: typeFor
};
