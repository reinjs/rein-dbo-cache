const Cache = require('../../../index');

module.exports = class HomeCache extends Cache {
  constructor(...args) {
    super(...args);
  }
  
  async ['/user/:name'](args) {
    return await this.service.home.get(this.mysql, args.name);
  }
};