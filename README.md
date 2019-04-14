Mock Server
============

### Why We Need A Mock Server

In order to better seperate the front-end and back-end, so that front-end will be without relying on the back-end environment for development, we need to provide a set of data sources to support business development.

***(just a POC version now)***

## Install

```bash
# Install NodeJS Environment
# recommend [nvm](https://github.com/creationix/nvm)

# Install Redis
brew install redis

# Install MongoDB
brew install mongodb

# Install express
$ npm install -g express

# Install babel(ES6 support)
$ npm install -g babel

# Install nodemon(watcher)
$ npm install -g nodemon

# Install pm2(Production environment management process, the local development can not be installed)
$ npm install -g pm2
```

## Usage
```bash
$ git clone https://github.com/Tivcrmn/Mock-Server.git

$ redis-server

```
add local.js in client/config/
```js
module.exports = {
  proxyTable: {
    '/api-self': {
      target: 'http://localhost:5100/api-self',
      changeOrigin: true,
      pathRewrite: {
        '^/api-self': ''
      }
    }
  }
}
```

```bash
$ cd client/ && npm i

$ cd server/ && npm i

$ npm run dev (both in client and server)
```


### API

`/api/{tenant}/{bucket}/version/path-to/resource`

`{tenant}` certain tenant

`{bucket}` a system in the certain tenant

API Schema in MongoDB

```json
{
    "_id" : ObjectId("5a41bd21e99b3d07ae7c8c66"),
    "adminId" : "59e56ff9671c670a6992bf9f",
    "bucket" : "duerOs",
    "tenant" : "Baidu",
    "method" : "GET",
    "url" : "getUsers",
    "repeat" : 10,
    "updateTime" : ISODate("2017-12-26T11:08:17.516+08:00"),
    "createTime" : ISODate("2017-12-26T11:08:17.516+08:00"),
    "disabled" : false,
    "version" : "2",
    "fields" : [
        {
            "fieldType" : "cn-name",
            "fieldName" : "name"
        },
        {
            "fieldType" : "age",
            "fieldName" : "age"
        },
        {
            "fieldType" : "en-gender",
            "fieldName" : "gender"
        },
        {
            "fieldType" : "mobile",
            "fieldName" : "mobile"
        }
    ],
    "query" : [
        {
            "queryType" : "number",
            "queryName" : "page"
        },
        {
            "queryType" : "number",
            "queryName" : "size"
        }
    ],
    "__v" : 0
}
```

Response Example

```json
{
    "success":true,
    "error":null,
    "data":[
        {
            "name":"苗润丽",
            "age":33,
            "gender":"female",
            "mobile":"18796202795"
        },
        {
            "name":"任苒溪",
            "age":58,
            "gender":"female",
            "mobile":"13001807186"
        },
        {
            "name":"谢文轩",
            "age":18,
            "gender":"male",
            "mobile":"17064062596"
        },
        {
            "name":"常润莎",
            "age":74,
            "gender":"female",
            "mobile":"13553720069"
        },
        {
            "name":"袁雨涵",
            "age":64,
            "gender":"female",
            "mobile":"13076933338"
        },
        {
            "name":"孙国栋",
            "age":95,
            "gender":"male",
            "mobile":"13739791169"
        },
        {
            "name":"卫昊轩",
            "age":89,
            "gender":"female",
            "mobile":"13019761804"
        },
        {
            "name":"窦欣汝",
            "age":23,
            "gender":"male",
            "mobile":"18954513077"
        },
        {
            "name":"柳嘉怡",
            "age":8,
            "gender":"male",
            "mobile":"13389352161"
        },
        {
            "name":"傅晓庆",
            "age":67,
            "gender":"male",
            "mobile":"18925655822"
        }
    ],
    "code":0
}
```

### Permission system

- Super Admin (Can change all the apis, users, buckets, tenants)
- Tenant Admin (Can change all the apis, users, buckets in its tenant)
- User (just can change apis and buckets which they have the permission on)

```json
{
    "success":false,
    "error":"ADMIN_ACCESS_DENIED",
    "data":null,
    "code":0,
    "message":"you are not administrator"
}
```

### Thanks to

- [Faker.js](http://marak.github.io/faker.js/)
