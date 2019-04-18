'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = (0, _express.Router)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
// app.use(cookieParser())

app.get('/', function (req, res, next) {
  res.send('hello word es6 112233: ' + process.env.NODE_ENV);
});

app.listen(3001, function (e) {
  console.log('server is running at http://localhost:3001');
});