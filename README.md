# cr2-raw
Native image and meta data retrieval from Canon RAW .CR2 files.

## Usage
This is just a quick example that demonstrates retrieving the preview image from a .CR2 file.

```js
var cr2Raw = require('cr2-raw'),
  fs = require('fs');

// Read RAW.
var raw = cr2Raw('my-image.CR2');

// Save preview image.
fs.writeFileSync('my-image.jpg', raw.previewImage());

```
