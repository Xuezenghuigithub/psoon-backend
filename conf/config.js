const config = {
  server: {
    port: 2000
  },
  mongodb: {
    connectStr: "mongodb://127.0.0.1:27017/psoon",
    poolSize: 10, // 保持的最大socket数量
    autoReconnect: true, // 是否开启自动重连
    reconnectTries: 999999, // 重连总时间
    reconnectInterval: 500,  // 重连间隔
    keepAliveInitialDelay: 120, // 激活 KeepAlive 以保持长时间运行
  }
}

module.exports = config;