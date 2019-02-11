const { NODE_ENV } = process.env;
const config = require(`./config/webpack/webpack.${NODE_ENV}`);

module.exports = config;
