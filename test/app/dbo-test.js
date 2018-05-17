module.exports = app => {
  app.receive('test', async () => {
    return await app.dbo.until(async way => {
      const cache = new app.cache.home(way.mysql, way.redis);
      const value = await cache.load('/user/:name', {
        name: 'shenyunjie'
      });
      return value;
    });
  });
};