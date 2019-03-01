'use strict';

const fs = require('fs'),
  path = require('path');

const jpeg = require('jpeg-lossless-decoder-js'),
  sharp = require('sharp');

const raw = require('.');

const filePath = path.resolve('test.CR2');

const rawData = raw(filePath);

fs.writeFileSync('test-preview.jpg', rawData.previewImage());

fs.writeFileSync('test-thumbnail.jpg', rawData.thumbnailImage());

fs.writeFileSync('test-unk1.jpg', rawData.unk1Image());

//fs.writeFileSync('test-unk2.jpg', rawData.unk2Image());

//require('sharp')(rawData.unk2Image())
//  .toFile('test-unk2.jpg');

let decoder = new jpeg.lossless.Decoder();

let output = decoder.decompress(rawData.unk2Image());

sharp(Buffer.from(output))
  .toFile('test-unk1.jpg');
