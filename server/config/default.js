module.exports = {
  port: 5000,
  COOKIE: {
    KEY_TOKEN: "msat", // Mock Server Access Token
    KEY_USER: "nbuser",
    MAX_AGE: 1000 * 60 * 60 * 24 // ms
  },
  redis: {
    // remote redis server
    host: "35.236.62.175",
    // local redis server
    // host: "127.0.0.1",
    port: 6379,
    db: 0
  },
  // remote mongdb server
  db: "mongodb://user:user123456@ds253879.mlab.com:53879/mock-server",
  // local mongdb server
  // db: "mongodb://127.0.0.1/ms-db",
  tokenName: "access_token",
  tokenExpireSeconds: 60 * 60 // 24 * 60 * 60
}
