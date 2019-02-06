'use stict';

const utils = require('./utils');

function read(buffer, offset, size, count) {

  let ta;

  offset = offset * 2;

  switch (size) {
    case 8:
      ta = new Uint8Array(buffer, offset, count);
      break;
    case 16:
      ta = new Uint16Array(buffer, offset, count);
      break;
    case 32:
      ta = new Uint32Array(buffer, offset, count);
      break;
    default:
      throw 'Oh shit!';
  }

  utils.arrayAsHex(ta);

  return ta;
}

function readString(buffer, offset, length) {

  let ta = read(buffer, offset, 8, length);
  let str = '';

  for (let i = 0; i < ta.length; i++) {
    str = `${str}${String.fromCharCode(ta[i])}`;
  }
  console.log(str);
  return str;
}

function readLong(buffer, offset) {

  let ta = read(buffer, offset, 32, 1);
  let long;

  long = parseInt(ta[0]);

  console.log(long);
  return long;
}

function readShort(buffer, offset) {

  let ta = read(buffer, offset, 16, 1);
  let short;

  short = parseInt(ta[0]);

  console.log(short);
  return short;
}

module.exports = {
  readString: readString,
  readLong: readLong,
  readShort: readShort
};
