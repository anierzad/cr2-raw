'use strict';

const fs = require('fs'),
  path = require('path');

const raw = require('.');

const filePath = path.resolve('test.CR2');

const previewImageData = raw(filePath).previewImage();

fs.writeFileSync('test.jpg', previewImageData);
