// git pull upstream master && git push origin master
import Koa from 'koa'
import path from 'path'
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import serve from 'koa-static'
import historyApiFallback from 'koa-connect-history-api-fallback'

import convert from 'koa-convert';

import Router from 'koa-router'
import indexRouter from './router/index';
import userRouter from './router/user';

import webpack from 'webpack'
import WebpackDevMiddleware from "koa-webpack-dev-middleware"
import WebpackHotMiddleware from "koa-webpack-hot-middleware"

import webpackConfig from './webpack.config'

const app = new Koa()

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false
})))

const compiler = webpack(webpackConfig);
app.use(convert(WebpackDevMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true
})));

app.use(convert(WebpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
})));

app.use(serve(__dirname + '/public'))

app.use(logger());
app.use(convert(bodyParser()));
app.keys = ['some secret hurr'];
app.use(convert(session(app)));

app.use(indexRouter.routes(), indexRouter.allowedMethods());
app.use(userRouter.routes(), userRouter.allowedMethods());

export default app
