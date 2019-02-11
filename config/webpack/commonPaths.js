const path = require('path');

const commonPaths = {
  outputPath: path.resolve(__dirname, '../../', 'dist'),
  entryPath: './app/index.js',
  imagesFolder: 'images',
};

module.exports = commonPaths;
