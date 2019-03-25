'use strict';

const fs = require('fs'),
  path = require('path');

const readBuffer = require('../../src/read-buffer'),
  dataTypes = require('../../src/read-buffer/data-types');

const testIterations = 5;

test('read ubyte', () => {

  const filePath = path.resolve(__dirname, '..', 'res', '_MG_4122.CR2');
  const data = fs.readFileSync(filePath);
  const rb = readBuffer(filePath);

  for (let i = 0; i < testIterations; i++) {

    const offset = randomOffset(data.length, dataTypes.types.ubyte.bytes);
    const exp = data[offset];

    const read = rb.read(offset, dataTypes.types.ubyte, 1);

    expect(read).toBe(exp);
  }

});

test('read string', () => {

  const filePath = path.resolve(__dirname, '..', 'res', '_MG_4122.CR2');
  const data = fs.readFileSync(filePath);
  const exp = 'Canon EOS 400D DIGITAL';

  const rb = readBuffer(filePath);
  const read = rb.read(202, dataTypes.types.string, 32);

  expect(read).toBe(exp);

});

test('read ushort', () => {

  const filePath = path.resolve(__dirname, '..', 'res', '_MG_4122.CR2');
  const data = fs.readFileSync(filePath);
  const rb = readBuffer(filePath);

  for (let i = 0; i < testIterations; i++) {

    const offset = randomOffset(data.length, dataTypes.types.ushort.bytes);
    const exp = joinBytes(data, offset, dataTypes.types.ushort.bytes);

    const read = rb.read(offset, dataTypes.types.ushort, 1);

    expect(read).toBe(exp);
  }

});

test('read ulong', () => {

  const filePath = path.resolve(__dirname, '..', 'res', '_MG_4122.CR2');
  const data = fs.readFileSync(filePath);
  const rb = readBuffer(filePath);

  for (let i = 0; i < testIterations; i++) {

    const offset = randomOffset(data.length, dataTypes.types.ulong.bytes);
    const exp = joinBytes(data, offset, dataTypes.types.ulong.bytes);

    const read = rb.read(offset, dataTypes.types.ulong, 1);

    expect(read).toBe(exp);
  }

});

test('copy random bytes', () => {

  const filePath = path.resolve(__dirname, '..', 'res', '_MG_4122.CR2');
  const data = fs.readFileSync(filePath);
  const rb = readBuffer(filePath);

  for (let i = 0; i < testIterations; i++) {

    const size = random(8, 1024);
    const offset = randomOffset(data.length, size);
    const exp = [...data.slice(offset, offset + size)];

    const read = rb.copy(offset, size);

    expect(read).toEqual(exp);
  }

});

function joinBytes(data, offset, count) {

  let res = 0;

  for (let i = (count - 1); i >= 0; i--) {
    res = (res * 256) + data[offset + i];
  }

  return res;
}

function randomOffset(datalength, readSize) {

  const min = 0,
    max = datalength - readSize;

    return random(max, min);
}

function random(max, min) {

  return Math.floor(Math.random() * (max - min + 1) + min);
}
