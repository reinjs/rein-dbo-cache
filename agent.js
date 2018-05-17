const path = require('path');
const is = require('is-type-of');
const Loader = require('@reinjs/rein-loader/lib/renderer');
module.exports = (app, plugin) => {
  let config = plugin.config || {};
  if (is.string(config)) {
    config = {
      name: config
    }
  }
  if (!config.name) {
    throw new Error('Miss `config.name` in plugin of ' + plugin.name);
  }
  app.loader.addCompiler('cache', dirs => {
    const directory = dirs.map(dir => path.resolve(dir.pathname, 'app/cache'));
    const _options = Object.assign({ match: ['**/*.js'], }, config.loader || {}, {
      inject: app,
      target: app.cache = {},
      call: false,
      directory,
      initializer: makeCacheClassModule(app, config.name, config.debug, app.logger)
    });
    new Loader(_options).load();
  });
};

function makeCacheClassModule(app, name, debug, logger) {
  return obj => {
    return class CacheClassModule extends obj {
      constructor(mysql, redis) {
        super(mysql, redis, { app, service: {} }, name, {
          debug, logger
        });
      }
    }
  }
}