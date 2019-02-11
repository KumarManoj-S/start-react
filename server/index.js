import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import handleRender from './Renderer';

const config = require('../webpack.config.js');

const port = 3000;
const server = Express();
const compiler = webpack(config);

if (process.env.NODE_ENV === 'development') {
  server.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: 'dist/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));

  server.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}

server.use(Express.static('dist'));

server.use(handleRender);

server.listen(port);
