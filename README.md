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

## API

### cr2raw

#### Static
#### `definitions`
MetaDefinitions describe how to find a specific tag including the tagId, which
IFD's to search for it and a parse function to use on the return value.

##### `ImageWidth`

###### Description
Retrieves '[Exif.Photo.PixelXDimension][exiv2-tags]' from the EXIF IFD and
returns it as an `int`.

##### `ImageHeight`

###### Description
Retrieves '[Exif.Photo.PixelYDimension][exiv2-tags]' from the EXIF IFD and
returns it as an `int`.

#### Construction
#### `cr2Raw(filePath)`

###### Parameters
- `filePath` _string_ - Path to .CR2 file

###### Description
Basic constructor used to parse a .CR2 file ready for use.

#### Methods
#### `previewImage()`

###### Description
Returns a `Buffer` containing the bytes which make up the preview image for the
file.

#### `thumbnailImage()`

###### Description
Returns a `Buffer` containing the bytes which make up the thumbnail image for
the file.

#### `fetchMeta(metaDefinition)`

###### Parameters
- `metaDefinition` _object_ - Meta data definition (see MetaDefinitions)

###### Description
Retrieves and returns a piece of meta data depending on the passed
MetaDefintion.

[exiv2-tags]: http://exiv2.org/tags.html
