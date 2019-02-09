'use strict';

const fs = require('fs'),
  path = require('path');

const readraw = require('./readraw');

// Get the path of the file.
const filePath = path.resolve('test.CR2');

const raw = readraw(filePath);

raw.getPreview();
