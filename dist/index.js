"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _keys = require("./config/keys");

var _keys2 = _interopRequireDefault(_keys);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _users = require("./routes/users");

var _users2 = _interopRequireDefault(_users);

var _auth = require("./routes/auth");

var _auth2 = _interopRequireDefault(_auth);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
_mongoose2.default.Promise = _bluebird2.default;

// Connect to Mongo
_mongoose2.default.connect(_keys2.default.mongoURI, { useNewUrlParser: true }).then(function () {
  return console.log("MongoDB connected!..");
}).catch(function (err) {
  return console.log("something went wrong!..", _keys2.default.mongoURI);
});

//user Routes
app.use("/api/users", _users2.default);
app.use("/api/auth", _auth2.default);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(_express2.default.static('client/build'));

  app.get('*', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

var port = process.env.PORT || 5000;

app.listen(port, function () {
  return console.log("server listening on port : " + port);
});
//# sourceMappingURL=index.js.map