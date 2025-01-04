'use strict';

const moment = require('moment');

const metaData = require('../../src/meta-data');
const { Orientation } = require('../../src/meta-data/definitions');

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

test('fetch date, stored as string', () => {

  const testDate = moment().milliseconds(0);
  const dateStr = testDate.format('YYYY:MM:DD HH:mm:ss');
  const testRaw = {
    ifds: {
      exif: {
        0x9003: {
          tagValue: -1, // Not used, but should be there.
          actualValue: dateStr
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.DateTaken);

  expect(actual).toEqual(testDate.toDate());
});

test('fetch date, stored as string, empty result', () => {

  const testRaw = {
    ifds: {
      exif: {
        0x9003: {
          tagValue: -1, // Not used, but should be there.
          actualValue: ''
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.DateTaken);

  expect(actual).toBeUndefined();
});

test('fetch date, stored as string, unexpected result', () => {

  const testRaw = {
    ifds: {
      exif: {
        0x9003: {
          tagValue: -1, // Not used, but should be there.
          actualValue: 'Cheese is not a crime.'
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.DateTaken);

  expect(actual).toBeUndefined();
});

test('fetch date, stored as string, bad date format', () => {

  const testRaw = {
    ifds: {
      exif: {
        0x9003: {
          tagValue: -1, // Not used, but should be there.
          actualValue: '12345 12:00:00'
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.DateTaken);

  expect(actual).toBeUndefined();
});

test('fetch date, stored as string, bad time format', () => {

  const testRaw = {
    ifds: {
      exif: {
        0x9003: {
          tagValue: -1, // Not used, but should be there.
          actualValue: '2000:01:01 12345'
        }
      }
    }
  };

  const actual = metaData.fetch(testRaw, metaData.definitions.DateTaken);

  expect(actual).toBeUndefined();
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

test('fetch orientation', () => {

  const testOrientation = 1;
  const testRaw = {
    ifds: {
      '0': {
        0x0112: {
          tagValue: 1
        }
      }
    }
  };
  const actual = metaData.fetch(testRaw, metaData.definitions.Orientation);
  expect(actual).toBe(testOrientation);
});
