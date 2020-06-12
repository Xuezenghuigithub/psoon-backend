const mongoose = require('mongoose');
const conf = require('../conf/config');

mongoose.set('useFindAndModify', false);

const options = {
  useNewUrlParser: true,
  autoReconnect: conf.mongodb.autoReconnect,
  reconnectTries: conf.mongodb.reconnectTries,
  reconnectInterval: conf.mongodb.reconnectInterval,
  keepAliveInitialDelay: conf.mongodb.keepAliveInitialDelay,
  poolSize: conf.mongodb.poolSize,
};
mongoose.connect(conf.mongodb.connectStr, options);
const db = mongoose.connection;

db.on('connected', () => {
  console.info('------- mongodb connected🤤');
});
db.on('error', (error) => {
  console.error('------- mongodb error😨', error);
});
db.on('disconnected', () => {
  console.error("------- disconnected....👋");
});