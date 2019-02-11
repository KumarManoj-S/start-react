const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  plugins: [
    new WebpackBundleAnalyzer({analyzerPort: 9999})
  ]
};

module.exports = config;
