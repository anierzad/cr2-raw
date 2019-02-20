'use strict';

const fs = require('fs'),
  path = require('path');

const raw = require('.');

const filePath = path.resolve('test.CR2');

fs.writeFileSync('test-preview.jpg', raw(filePath).previewImage());

fs.writeFileSync('test-thumbnail.jpg', raw(filePath).thumbnailImage());
