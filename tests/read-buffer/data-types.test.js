'use strict';

const dataTypes = require('../../read-buffer/data-types');

test('get type for TIFF type 1', () => {

  const type = dataTypes.typeFor(1);

  expect(type).toBe(dataTypes.types.ubyte);

});

test('get type for TIFF type 2', () => {

  const type = dataTypes.typeFor(2);

  expect(type).toBe(dataTypes.types.string);

});

test('get type for TIFF type 3', () => {

  const type = dataTypes.typeFor(3);

  expect(type).toBe(dataTypes.types.ushort);

});

test('get type for TIFF type 4', () => {

  const type = dataTypes.typeFor(4);

  expect(type).toBe(dataTypes.types.ulong);

});
