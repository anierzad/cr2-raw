'use strict';

const path = require('path'),
  md5 = require('md5');

const cr2Raw = require('../');

test('extract preview image from _MG_4122.CR2', () => {

  const cr2Path = path.resolve(__dirname, 'res', '_MG_4122.CR2');
  const raw = cr2Raw(cr2Path);
  const buffer = raw.previewImage();

  const md5Hash = md5(buffer);

  expect(md5Hash).toEqual('a2f302d02a84f1c4b77daec6b7d8425c');
});

test('extract thumbnail image from _MG_4122.CR2', () => {

  const cr2Path = path.resolve(__dirname, 'res', '_MG_4122.CR2');
  const raw = cr2Raw(cr2Path);
  const buffer = raw.thumbnailImage();

  const md5Hash = md5(buffer);

  expect(md5Hash).toEqual('94c6a3bc6253cb810f9b4487ed8d268d');
});

test('extract preview image from _MG_7688.CR2', () => {

  const cr2Path = path.resolve(__dirname, 'res', '_MG_7688.CR2');
  const raw = cr2Raw(cr2Path);
  const buffer = raw.previewImage();

  const md5Hash = md5(buffer);

  expect(md5Hash).toEqual('d57581b52112c9dd57ea6ae68d7c3f48');
});

test('extract thumbnail image from _MG_7688.CR2', () => {

  const cr2Path = path.resolve(__dirname, 'res', '_MG_7688.CR2');
  const raw = cr2Raw(cr2Path);
  const buffer = raw.thumbnailImage();

  const md5Hash = md5(buffer);

  expect(md5Hash).toEqual('08f0ca77a0b841c91919c8ed8445580f');
});

test('extract preview image from _MG_8367.CR2', () => {

  const cr2Path = path.resolve(__dirname, 'res', '_MG_8367.CR2');
  const raw = cr2Raw(cr2Path);
  const buffer = raw.previewImage();

  const md5Hash = md5(buffer);

  expect(md5Hash).toEqual('bb690c93dacf5c52ed4705beb63e125a');
});

test('extract thumbnail image from _MG_8367.CR2', () => {

  const cr2Path = path.resolve(__dirname, 'res', '_MG_8367.CR2');
  const raw = cr2Raw(cr2Path);
  const buffer = raw.thumbnailImage();

  const md5Hash = md5(buffer);

  expect(md5Hash).toEqual('0c6c9c003db121d35abf94699eb6daf9');
});

test('extract preview image from notraw.jpg', () => {

  const cr2Path = path.resolve(__dirname, 'res', 'notraw.jpg');
  const raw = cr2Raw(cr2Path);
  const buffer = raw.previewImage();

  expect(buffer).toBeNull();
});

test('extract thumbnail image from notraw.jpg', () => {

  const cr2Path = path.resolve(__dirname, 'res', 'notraw.jpg');
  const raw = cr2Raw(cr2Path);
  const buffer = raw.thumbnailImage();

  expect(buffer).toBeNull();
});
