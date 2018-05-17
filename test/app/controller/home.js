const Controller = require('@reinjs/rein-class');

module.exports = class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  
  async hello() {
    // const cache = new this.ctx.cache.home(this.ctx.dbo.mysql, this.ctx.dbo.redis);
    // const data = await cache.load('/user/:name', {
    //   name: 'yixianle'
    // });
    // this.ctx.body = data;
    
    const a = await this.ctx.sendback('dbo-test', 'test');
    this.ctx.body = a;
  }
};