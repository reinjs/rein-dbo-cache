const Cluster = require('@reinjs/rein-cluster');
const cluster = new Cluster({
  cwd: __dirname,
  agents: ['dbo-test'],
  timeout: 10000,
  framework: '@reinjs/rein'
});
cluster.listen();