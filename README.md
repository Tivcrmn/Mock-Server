Mock Server
============

### How to run

### Redis in GCP
1. start the vm
2. open the ssh window
3. run "redis-server" in one window
4. run "redis-cli" in another window
5. type "CONFIG SET protected-mode no" to disable protected-mode
6. type "CONFIG SET requirepass password" to set password

#### Client
```bash
cd client/

npm i

npm start
```
#### Server

add default.js in config directory
```javascript
module.exports = {
  port: 5000,
  redis: {
    host: "a.b.c.d",
    port: 6379,
    db: 0
  },
  db: "mongodb://xxx",
  tokenName: "access_token",
  tokenExpireSeconds: 60 * 60 // one hour
};
```

```bash
cd server/

npm i

npm start
```
