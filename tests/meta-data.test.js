'use strict';

const metaData = require('../meta-data');

test('fetch fail, no ifd', () => {

  const testRaw = {
    ifds: {}
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.ImageWidth);

  expect(actual).toBeUndefined();
});

test('fetch fail, no tag', () => {

  const testRaw = {
    ifds: {
      exif: {}
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.ImageWidth);

  expect(actual).toBeUndefined();
});

test('fetch fail, no value', () => {

  const testRaw = {
    ifds: {
      exif: {
        0xa002: {}
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.ImageWidth);

  expect(actual).toBeUndefined();
});

test('fetch integer, stored as string', () => {

  const testRaw = {
    ifds: {
      exif: {
        0xa002: {
          tagValue: '12345'
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.ImageWidth);

  expect(actual).toBe(12345);
});

test('definition has no ifd', () => {

  const testDef = {
    tagId: 0xa002
  };
  const testRaw = {
    ifds: {
      exif: {
        0xa002: {
          tagValue: 12345
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, testDef);

  expect(actual).toBe(12345);
});

test('defines width', () => {

  const widthTag = 0xa002;
  const widthIfd = 'exif';

  const actual = metaData.definitions.ImageWidth;

  expect(actual).toBeDefined();
  expect(actual.tagId).toBe(widthTag);
  expect(actual.ifd).toBe(widthIfd);
});

test('fetch width', () => {

  const testWidth = 1280;
  const testRaw = {
    ifds: {
      exif: {
        0xa002: {
          tagValue: testWidth
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.ImageWidth);

  expect(actual).toBe(testWidth);
});

test('defines height', () => {

  const heightTag = 0xa003;
  const heightIfd = 'exif';

  const actual = metaData.definitions.ImageHeight;

  expect(actual).toBeDefined();
  expect(actual.tagId).toBe(heightTag);
  expect(actual.ifd).toBe(heightIfd);
});

test('fetch height', () => {

  const testHeight = 1024;
  const testRaw = {
    ifds: {
      exif: {
        0xa003: {
          tagValue: testHeight
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.ImageHeight);

  expect(actual).toBe(testHeight);
});
