'use strict';

const definitions = require('../../src/meta-data/definitions')

test('defines ImageWidth', () => {

  const tagId = 0xa002;
  const tagType = 4;
  const ifd = 'exif';

  const actual = definitions.ImageWidth;

  expect(actual).toBeDefined();
  expect(actual.tagId).toBe(tagId);
  expect(actual.tagType).toBe(tagType);
  expect(actual.ifd).toBe(ifd);
});

test('defines ImageHeight', () => {

  const tagId = 0xa003;
  const tagType = 4;
  const ifd = 'exif';

  const actual = definitions.ImageHeight;

  expect(actual).toBeDefined();
  expect(actual.tagId).toBe(tagId);
  expect(actual.tagType).toBe(tagType);
  expect(actual.ifd).toBe(ifd);
});

test('defines DateTaken', () => {

  const tagId = 0x9003;
  const tagType = 2;
  const ifd = 'exif';

  const actual = definitions.DateTaken;

  expect(actual).toBeDefined();
  expect(actual.tagId).toBe(tagId);
  expect(actual.tagType).toBe(tagType);
  expect(actual.ifd).toBe(ifd);
});
