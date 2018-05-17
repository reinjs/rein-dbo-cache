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
    const _options = Object.assign({ property: 'cache', match: ['**/*.js'], }, config.loader || {}, {
      inContext: true,
      inject: app,
      target: app.cache = {},
      directory,
      runtime: createCacheClassModule(config.name, config.debug, app.logger)
    });
    new Loader(_options).load();
  });
};

function createCacheClassModule(name, debug, logger) {
  return (Class, ctx) => {
    return class CacheClassModule extends Class {
      constructor(mysql, redis) {
        super(mysql, redis, ctx, name, {
          debug, logger
        });
      }
    }
  }
}