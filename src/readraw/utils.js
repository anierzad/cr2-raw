'use strict';

function readBuffer(buffer) {

  while (startPos < buffer.byteLength) {

    let read = 16;

    if (startPos + read > buffer.byteLength) {
      read = buffer.byteLength - startPos;
    }

    var typedArray = new Uint8Array(buffer, startPos, read);

    printAsHex(typedArray);

    startPos += 16;
  }
}

function arrayAsHex(array) {
  let str = 'Hex: [ ';

  for (let i = 0; i < array.length; i++) {
    str = str + ('00' + array[i].toString(16)).slice(-2);

    if (i + 1 < array.length) {
      str = str + ', ';
    }
  }

  str = str + ' ]';

  console.log(str);
}

module.exports = {
  arrayAsHex: arrayAsHex
};
