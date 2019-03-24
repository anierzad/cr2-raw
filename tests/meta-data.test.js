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
      1: {}
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.ImageWidth);

  expect(actual).toBeUndefined();
});

test('fetch fail, no value', () => {

  const testRaw = {
    ifds: {
      1: {
        0x0100: {}
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.ImageWidth);

  expect(actual).toBeUndefined();
});

test('fetch integer, stored as string', () => {

  const testRaw = {
    ifds: {
      0: {
        0x0100: {
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
    tagId: 0x0100
  };
  const testRaw = {
    ifds: {
      3: {
        0x0100: {
          tagValue: 12345
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, testDef);

  expect(actual).toBe(12345);
});

test('defines width', () => {

  const widthTag = 0x0100;
  const widthIfd = 0;

  const actual = metaData.definitions.ImageWidth;

  expect(actual).toBeDefined();
  expect(actual.tagId).toBe(widthTag);
  expect(actual.ifd).toBe(widthIfd);
});

test('fetch width', () => {

  const testWidth = 1280;
  const testRaw = {
    ifds: {
      0: {
        0x0100: {
          tagValue: testWidth
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.ImageWidth);

  expect(actual).toBe(testWidth);
});

test('defines height', () => {

  const widthTag = 0x0101;
  const widthIfd = 0;

  const actual = metaData.definitions.ImageHeight;

  expect(actual).toBeDefined();
  expect(actual.tagId).toBe(widthTag);
  expect(actual.ifd).toBe(widthIfd);
});

test('fetch height', () => {

  const testHeight = 1024;
  const testRaw = {
    ifds: {
      0: {
        0x0101: {
          tagValue: testHeight
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.ImageHeight);

  expect(actual).toBe(testHeight);
});
